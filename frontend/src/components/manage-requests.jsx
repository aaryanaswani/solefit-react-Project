import React, { useEffect, useState } from 'react';
import { fetchRequests, updateRequestStatus } from '../api'; // Import API functions
import '../Styles/manage-requests.css'; // Ensure the CSS file exists

const ManageRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [response, setResponse] = useState('');
    const [filter, setFilter] = useState('All'); // Filter state for request status

    // Fetch requests on component mount
    useEffect(() => {
        const loadRequests = async () => {
            try {
                const data = await fetchRequests();
                setRequests(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch requests.');
                setLoading(false);
            }
        };

        loadRequests();
    }, []);

    // Handle response input changes
    const handleResponseChange = (event) => {
        setResponse(event.target.value);
    };

    // Submit a response for a request
    const handleSubmitResponse = async () => {
        if (response.trim() !== '') {
            try {
                await updateRequestStatus(selectedRequestId, response); // Call API

                // Update the UI to reflect the change
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request.request_id === selectedRequestId
                            ? { ...request, response, status: 'Resolved' }
                            : request
                    )
                );

                // Reset fields
                setSelectedRequestId(null);
                setResponse('');
            } catch (error) {
                setError('Failed to update request.');
            }
        }
    };

    // Change filter and display requests accordingly
    const handleFilterChange = (status) => {
        setFilter(status);
    };

    // Filtered requests based on the selected filter
    const filteredRequests =
        filter === 'All'
            ? requests
            : requests.filter((request) => request.status === filter);

    if (loading) {
        return <p>Loading requests...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="manage-requests">
            <h1>Manage Requests</h1>

            {/* Filter Section */}
            <div className="filter-container">
                <label className="filter-label" htmlFor="filter-dropdown">
                    {/* Manual SVG for filter icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="20"
                        height="20"
                        style={{ marginRight: '8px' }}
                    >
                        <path d="M10 18h4v-2h-4v2zm-7-6v2h18v-2H3zm3-6v2h12V6H6z" />
                    </svg>
                    Filter:
                </label>
                <select
                    id="filter-dropdown"
                    className="filter-dropdown"
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            {/* Table Section */}
            {filteredRequests.length > 0 ? (
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Response</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request) => (
                            <tr key={request.request_id}>
                                <td>{request.request_id}</td>
                                <td>{request.user_id}</td>
                                <td>{request.name}</td>
                                <td>{request.email}</td>
                                <td>{request.phone || 'N/A'}</td>
                                <td>{request.message}</td>
                                <td>{request.response || 'N/A'}</td>
                                <td>{request.status}</td>
                                <td>
                                    {new Date(request.created_at).toLocaleDateString()}
                                </td>
                                <td>
                                    {new Date(request.updated_at).toLocaleDateString()}
                                </td>
                                <td>
                                    {selectedRequestId === request.request_id ? (
                                        <div>
                                            <textarea
                                                value={response}
                                                onChange={handleResponseChange}
                                                placeholder="Enter response"
                                                className="response-textarea"
                                            />
                                            <button
                                                onClick={handleSubmitResponse}
                                                className="submit-btn"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setSelectedRequestId(request.request_id)
                                            }
                                            className="respond-btn"
                                        >
                                            Respond
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No requests found.</p>
            )}
        </div>
    );
};

export default ManageRequests;
