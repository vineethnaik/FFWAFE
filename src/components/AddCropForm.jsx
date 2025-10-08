import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const initialForm = {
	cropName: '',
	cropType: '',
	quantity: '',
	price: '',
	harvestDate: '',
	location: '',
	description: '',
	image: null
};

function AddCropForm({ farmerId }) {
	const [form, setForm] = useState(initialForm);
	const [status, setStatus] = useState({ type: '', msg: '' });
	const [submitting, setSubmitting] = useState(false);

	function handleChange(e) {
		const { name, value, files } = e.target;
		if (name === 'image') {
			setForm(prev => ({ ...prev, image: files && files[0] ? files[0] : null }));
		} else {
			setForm(prev => ({ ...prev, [name]: value }));
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus({ type: '', msg: '' });
		if (!farmerId) {
			setStatus({ type: 'error', msg: 'Missing farmerId' });
			return;
		}
		try {
			setSubmitting(true);
			const data = new FormData();
			data.append('cropName', form.cropName);
			data.append('cropType', form.cropType);
			data.append('quantity', form.quantity);
			data.append('price', form.price);
			data.append('harvestDate', form.harvestDate);
			data.append('location', form.location);
			data.append('description', form.description);
			if (form.image) data.append('image', form.image);

			const url = `${API_BASE_URL}/farmers/${farmerId}/crops`;
			await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
			setStatus({ type: 'success', msg: 'Crop added successfully!' });
			setForm(initialForm);
		} catch (err) {
			const msg = err?.response?.data?.message || err.message || 'Failed to add crop.';
			setStatus({ type: 'error', msg });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div style={{ maxWidth: 760, margin: '8px auto' }}>
			<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
				<div style={{ marginBottom: 10 }}>
					<label style={{ color: '#225c2b', fontWeight: 600 }}>Crop Name</label>
					<input name="cropName" value={form.cropName} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label style={{ color: '#225c2b', fontWeight: 600 }}>Crop Type</label>
					<input name="cropType" value={form.cropType} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
				</div>
				<div style={{ display: 'flex', gap: 12 }}>
					<div style={{ flex: 1 }}>
						<label style={{ color: '#225c2b', fontWeight: 600 }}>Quantity</label>
						<input type="number" name="quantity" value={form.quantity} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
					</div>
					<div style={{ flex: 1 }}>
						<label style={{ color: '#225c2b', fontWeight: 600 }}>Price</label>
						<input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
					</div>
				</div>
				<div>
					<label style={{ color: '#225c2b', fontWeight: 600 }}>Harvest Date</label>
					<input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label style={{ color: '#225c2b', fontWeight: 600 }}>Location</label>
					<input name="location" value={form.location} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label style={{ color: '#225c2b', fontWeight: 600 }}>Description</label>
					<textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d9e2da' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label style={{ color: '#225c2b', fontWeight: 600 }}>Image</label>
					<input type="file" name="image" accept="image/*" onChange={handleChange} />
				</div>
				<button type="submit" disabled={submitting} style={{ background: '#2e7d32', color: 'white', border: 0, padding: '12px 16px', borderRadius: 8, cursor: 'pointer' }}>{submitting ? 'Submitting...' : 'Add Crop'}</button>
			</form>
			{status.msg && (
				<p style={{ color: status.type === 'error' ? '#c62828' : '#2e7d32', fontWeight: 600 }}>{status.msg}</p>
			)}
		</div>
	);
}

export default AddCropForm;


