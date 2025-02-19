<template>
    <div class="container">
        <h1>Admin Panel</h1>
        <form @submit.prevent="uploadFile">
            <div class="mb-3">
                <label for="regionId" class="form-label">Region ID</label>
                <input type="number" class="form-control" id="regionId" v-model="regionId" required>
            </div>
            <div class="mb-3">
                <label for="fileType" class="form-label">File Type</label>
                <select class="form-control" id="fileType" v-model="fileType" required>
                    <option value="area">Area of the Region</option>
                    <option value="settlements">Number of Municipalities, Cities and Villages</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="file" class="form-label">Excel File</label>
                <input type="file" class="form-control" id="file" @change="handleFileUpload" required>
            </div>
            <button type="submit" class="btn btn-primary">Upload</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            regionId: null,
            fileType: 'area',
            file: null
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            const formData = new FormData();
            formData.append('regionId', this.regionId);
            formData.append('fileType', this.fileType);
            formData.append('file', this.file);

            try {
                const response = await axios.post('http://localhost:8000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('File uploaded successfully');
            } catch (error) {
                console.error('Error uploading file:', error.response ? error.response.data : error.message);
                alert('Error uploading file');
            }
        }
    }
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>
