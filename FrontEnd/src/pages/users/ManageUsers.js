import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from "../../config/config";
import { Modal } from 'react-bootstrap';

const USER_ROLES = ['viewer', 'developer'];

function ManageUsers() {
    const [errors, setErrors] = useState({});
    const [usersData, setUsersData] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        role: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const handleModalShow = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                email: data.email,
                role: data.role,
                name: data.name
            });
        } else {
            setFormData({
                email: '',
                role: '',
                name: ''
            });
        }
        setIsEdit(isEdit);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteModalShow = (userId) => {
        setFormData({
            id: userId
        });
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = async () => {
        try {
            setFormLoading(true);
            await axios.delete(`${serverEndpoint}/users/${formData.id}`, { withCredentials: true });
            setFormData({ email: '', role: '', name: '' });
            fetchUsers();
        } catch (error) {
            setErrors({ message: 'Something went wrong, please try again' });
        } finally {
            handleDeleteModalClose();
            setFormLoading(false);
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.email.length === 0) {
            newErrors.email = "Email is mandatory";
            isValid = false;
        }
        if (formData.role.length === 0) {
            newErrors.role = "Role is mandatory";
            isValid = false;
        }
        if (formData.name.length === 0) {
            newErrors.name = "Name is mandatory";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            setFormLoading(true);
            const body = {
                email: formData.email,
                name: formData.name,
                role: formData.role
            };
            const configuration = { withCredentials: true };
            try {
                if (isEdit) {
                    await axios.put(`${serverEndpoint}/users/${formData.id}`, body, configuration);
                } else {
                    await axios.post(`${serverEndpoint}/users`, body, configuration);
                }
                setFormData({ email: '', name: '', role: '' });
                fetchUsers();
            } catch (error) {
                setErrors({ message: 'Something went wrong, please try again' });
            } finally {
                handleModalClose();
                setFormLoading(false);
            }
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${serverEndpoint}/users`, { withCredentials: true });
            setUsersData(response.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch users at the moment, please try again' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const columns = [
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'role', headerName: 'Role', flex: 2 },
        {
            field: 'action', headerName: 'Action', flex: 1, renderCell: (params) => (
                <>
                    <IconButton>
                        <EditIcon onClick={() => handleModalShow(true, params.row)} />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon onClick={() => handleDeleteModalShow(params.row._id)} />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <div className="manage-users-container">
            <div className="header-section">
                <h2>Manage Users</h2>
                <p className="subtitle">Admin panel for adding, updating, and removing users efficiently.</p>
                <button className="neon-button" onClick={() => handleModalShow(false)}>Add New User</button>
            </div>

            {errors.message && (
                <div className="error-alert">{errors.message}</div>
            )}

            <div className="info-summary">
                Total Registered Users: <span>{usersData.length}</span>
            </div>

            <div className="data-grid-container">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={usersData}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 20, page: 0 } },
                    }}
                    pageSizeOptions={[20, 50, 100]}
                    disableRowSelectionOnClick
                    loading={loading}
                />
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label>Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select</option>
                                {USER_ROLES.map((role) => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                        </div>
                        <button type="submit" className="neon-button submit-button">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <button className="neon-button secondary" onClick={handleDeleteModalClose}>Cancel</button>
                    <button className="neon-button danger" onClick={handleDeleteSubmit}>Delete</button>
                </Modal.Footer>
            </Modal>

            <style>{`
                .manage-users-container {
                    padding: 30px;
                    background: linear-gradient(135deg, #4f46e5, #6d28d9);
                    color: white;
                    min-height: 100vh;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .header-section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-bottom: 20px;
                }

                .header-section h2 {
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .subtitle {
                    font-size: 14px;
                    color: #d1d5db;
                    margin-bottom: 10px;
                }

                .neon-button {
                    padding: 8px 20px;
                    border: none;
                    border-radius: 50px;
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

                .neon-button.secondary {
                    background: gray;
                }

                .neon-button.danger {
                    background: crimson;
                }

                .error-alert {
                    background: rgba(255,0,0,0.2);
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 10px;
                }

                .info-summary {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .info-summary span {
                    color: #facc15;
                    font-weight: bold;
                }

                .data-grid-container {
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    padding: 10px;
                }

                .submit-button {
                    width: 100%;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
}

export default ManageUsers;
