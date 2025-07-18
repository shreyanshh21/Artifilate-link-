import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../../config/config';
import { Modal } from 'react-bootstrap';
import { usePermission } from '../../rbac/userPermissions';
import { useNavigate } from 'react-router-dom';

function LinksDashboard() {
  const [errors, setErrors] = useState({});
  const [linksData, setLinksData] = useState([]);
  const [clickStats, setClickStats] = useState({ totalClicks: 0, totalLinks: 0, topCategory: '-' });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const permission = usePermission();
  const [formData, setFormData] = useState({ campaignTitle: "", originalUrl: "", category: "" });

  const handleShowDeleteModal = (linkId) => {
    setFormData({ id: linkId });
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${serverEndpoint}/links/${formData.id}`, { withCredentials: true });
      await fetchLinks();
      handleCloseDeleteModal();
    } catch (error) {
      setErrors({ message: 'Unable to delete the link, please try again' });
    }
  };

  const handleOpenModal = (isEdit, data = {}) => {
    if (isEdit) {
      setFormData({
        id: data._id,
        campaignTitle: data.campaignTitle,
        originalUrl: data.originalUrl,
        category: data.category
      });
    }
    setIsEdit(isEdit);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;
    if (!formData.campaignTitle) { newErrors.campaignTitle = "Campaign Title is mandatory"; isValid = false; }
    if (!formData.originalUrl) { newErrors.originalUrl = "URL is mandatory"; isValid = false; }
    if (!formData.category) { newErrors.category = "Category is mandatory"; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const body = {
        campaign_title: formData.campaignTitle,
        original_url: formData.originalUrl,
        category: formData.category
      };
      const config = { withCredentials: true };
      try {
        if (isEdit) {
          await axios.put(`${serverEndpoint}/links/${formData.id}`, body, config);
        } else {
          await axios.post(`${serverEndpoint}/links`, body, config);
        }
        await fetchLinks();
        setFormData({ campaignTitle: "", originalUrl: "", category: "" });
      } catch (error) {
        setErrors({ message: 'Unable to add the Link, please try again' });
      } finally {
        handleCloseModal();
      }
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/links`, { withCredentials: true });
      setLinksData(response.data.data);

      // Calculate quick stats
      let totalClicks = 0;
      let categoryCount = {};
      response.data.data.forEach(link => {
        totalClicks += link.clickCount;
        categoryCount[link.category] = (categoryCount[link.category] || 0) + 1;
      });
      const topCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, '-');
      setClickStats({ totalClicks, totalLinks: response.data.data.length, topCategory });
    } catch (error) {
      console.log(error);
      setErrors({ message: 'Unable to fetch links at the moment. Please try again' });
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const columns = [
    { field: 'campaignTitle', headerName: 'Campaign', flex: 2 },
    {
      field: 'originalUrl', headerName: 'URL', flex: 3, renderCell: (params) => (
        <a href={`${serverEndpoint}/links/r/${params.row._id}`} target='_blank' rel="noopener noreferrer">
          {params.row.originalUrl}
        </a>
      )
    },
    { field: 'category', headerName: 'Category', flex: 2 },
    { field: 'clickCount', headerName: 'Clicks', flex: 1 },
    {
      field: 'action', headerName: 'Action', flex: 1, renderCell: (params) => (
        <>
          {permission.canEditLink && (
            <IconButton onClick={() => handleOpenModal(true, params.row)}>
              <EditIcon />
            </IconButton>
          )}
          {permission.canDeleteLink && (
            <IconButton onClick={() => handleShowDeleteModal(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {permission.canViewLink && (
            <IconButton onClick={() => navigate(`/analytics/${params.row._id}`)}>
              <AssessmentIcon />
            </IconButton>
          )}
        </>
      )
    },
  ];

  return (
    <div className="links-dashboard-container">
      <div className="welcome-section">
        <h2>Welcome to your Affiliate Dashboard</h2>
        <p>Manage, track, and analyze your affiliate campaigns effectively.</p>
      </div>

      <div className="stats-cards">
        <div className="card"><h3>{clickStats.totalLinks}</h3><p>Total Links</p></div>
        <div className="card"><h3>{clickStats.totalClicks}</h3><p>Total Clicks</p></div>
        <div className="card"><h3>{clickStats.topCategory}</h3><p>Top Category</p></div>
      </div>

      <div className="header-bar">
        <h3>Manage Affiliate Links</h3>
        {permission.canCreateLink && (
          <button className="neon-button" onClick={() => handleOpenModal(false)}>Add New Link</button>
        )}
      </div>

      {errors.message && <div className="error-alert">{errors.message}</div>}

      <div className="data-grid-container">
        <DataGrid
          getRowId={(row) => row._id}
          rows={linksData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          disableSelectionOnClick
        />
      </div>

      <div className="tips-section">
        <p>💡 <strong>Tip:</strong> Promote your top links regularly on social media for better conversions.</p>
      </div>

      {/* Modals */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Update Link" : "Add Link"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {["campaignTitle", "originalUrl", "category"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={errors[field] ? "invalid" : ""}
                />
                {errors[field] && <span className="error">{errors[field]}</span>}
              </div>
            ))}
            <button type="submit" className="neon-button submit-button">Submit</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete the link?</Modal.Body>
        <Modal.Footer>
          <button className="neon-button secondary" onClick={handleCloseDeleteModal}>Cancel</button>
          <button className="neon-button danger" onClick={handleDelete}>Delete</button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .links-dashboard-container {
          padding: 30px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          min-height: 100vh;
        }
        .welcome-section {
          text-align: center;
          margin-bottom: 30px;
        }
        .stats-cards {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
        }
        .stats-cards .card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          flex: 1;
          margin: 0 10px;
        }
        .stats-cards .card h3 {
          margin: 0;
          font-size: 28px;
        }
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .neon-button {
          padding: 10px 20px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 10px #ec4899;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .neon-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }
        .error-alert {
          background: rgba(255,0,0,0.2);
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 10px;
        }
        .data-grid-container {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 10px;
        }
        .tips-section {
          margin-top: 30px;
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 10px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
        .form-group input {
          width: 100%;
          padding: 8px 10px;
          border: none;
          border-radius: 8px;
          outline: none;
        }
        .form-group input.invalid {
          border: 2px solid red;
        }
        .error {
          color: red;
          font-size: 12px;
        }
        .submit-button {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default LinksDashboard;
