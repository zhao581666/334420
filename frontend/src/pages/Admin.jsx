import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI, contactAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editItem, setEditItem] = useState(null);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: '',
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } else if (activeTab === 'blog') {
        const response = await blogAPI.getAll();
        setPosts(response.data);
      } else if (activeTab === 'messages') {
        const response = await contactAPI.getAll();
        setMessages(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    if (type === 'project') {
      setProjectForm(item || {
        title: '',
        description: '',
        imageUrl: '',
        repoUrl: '',
        liveUrl: '',
      });
    } else if (type === 'blog') {
      setBlogForm(item || { title: '', content: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
    setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
    setBlogForm({ title: '', content: '' });
  };

  // Project handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await projectsAPI.update(editItem._id, projectForm);
      } else {
        await projectsAPI.create(projectForm);
      }
      fetchData();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  // Blog handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await blogAPI.update(editItem._id, blogForm);
      } else {
        await blogAPI.create(blogForm);
      }
      fetchData();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleBlogDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await blogAPI.delete(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete blog post');
    }
  };

  // Message handlers
  const handleMessageDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactAPI.delete(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-welcome">Welcome, {user?.username}!</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog Posts
        </button>
        <button
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Manage Projects</h2>
                  <button className="btn btn-primary" onClick={() => openModal('project')}>
                    + New Project
                  </button>
                </div>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="empty-row">No projects yet</td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr key={project._id}>
                            <td>{project.title}</td>
                            <td className="desc-cell">{project.description.substring(0, 50)}...</td>
                            <td>{formatDate(project.createdAt)}</td>
                            <td className="actions-cell">
                              <button
                                className="btn-icon edit"
                                onClick={() => openModal('project', project)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-icon delete"
                                onClick={() => handleProjectDelete(project._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Blog Tab */}
            {activeTab === 'blog' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Manage Blog Posts</h2>
                  <button className="btn btn-primary" onClick={() => openModal('blog')}>
                    + New Post
                  </button>
                </div>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="empty-row">No blog posts yet</td>
                        </tr>
                      ) : (
                        posts.map((post) => (
                          <tr key={post._id}>
                            <td>{post.title}</td>
                            <td>{post.author?.username}</td>
                            <td>{formatDate(post.createdAt)}</td>
                            <td className="actions-cell">
                              <button
                                className="btn-icon edit"
                                onClick={() => openModal('blog', post)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-icon delete"
                                onClick={() => handleBlogDelete(post._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Contact Messages</h2>
                </div>
                <div className="messages-grid">
                  {messages.length === 0 ? (
                    <p className="empty-state">No messages yet</p>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg._id} className="message-card">
                        <div className="message-header">
                          <h4>{msg.name}</h4>
                          <span className="message-date">{formatDate(msg.createdAt)}</span>
                        </div>
                        <p className="message-email">{msg.email}</p>
                        <p className="message-body">{msg.message}</p>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleMessageDelete(msg._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>

            {modalType === 'project' && (
              <form onSubmit={handleProjectSubmit} className="modal-form">
                <h2>{editItem ? 'Edit Project' : 'New Project'}</h2>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Repository URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={projectForm.repoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Live URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  {editItem ? 'Update' : 'Create'} Project
                </button>
              </form>
            )}

            {modalType === 'blog' && (
              <form onSubmit={handleBlogSubmit} className="modal-form">
                <h2>{editItem ? 'Edit Post' : 'New Post'}</h2>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-textarea"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    rows="8"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  {editItem ? 'Update' : 'Create'} Post
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
