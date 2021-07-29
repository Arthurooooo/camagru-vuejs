<template>
    <div class="container">
        <div class="form-row d-flex justify-content-center">
            <div class="col-md-12">
                <vue-web-cam
                    ref="webcam"
                    :device-id="deviceId"
                    width="100%"
                    @started="onStarted"
                    @stopped="onStopped"
                    @error="onError"
                    @cameras="onCameras"
                    @camera-change="onCameraChange"
                />
                <div class="row mt-2 d-flex justify-content-center">
                    <div class="col-md-4">
                        <label for="device">Camera</label>
                        <select
                            v-model="camera"
                            name="device"
                            id="device"
                            class="form-control"
                        >
                            <option>Selecione o Dispositivo</option>
                            <option
                                v-for="device in devices"
                                :key="device.deviceId"
                                :value="device.deviceId"
                                >{{ device.label }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <button v-on:click="onCapture">capture</button>
        <div>
            <template v-for="(post, imageindex) in postArray">
                
                <img :src="post.img" :key="imageindex">
                
            </template>
        </div>
    </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
import axios from 'axios';
import ContentService from '../services/content.service.js'

const API_URL = 'http://localhost:8080/api';


export default {
    name: "Montage",
    props: {
    },
    components: {
        "vue-web-cam": WebCam
    },
        data() {
        return {
            postArray: [],
            img: null,
            camera: null,
            deviceId: null,
            devices: [],
            imagePath: ''
        };
    },
    mounted() {
        axios.get(API_URL + '/get-image',{
        })
        .then((res) => {
            console.log(res)
            var post = res
            this.postArray = res.data;
            //console.log(this.img)
            return post
        })
    },
    computed: {
        userlastpost: function(){
            //var post = ContentService.getPost()
            //console.log(ContentService.getPost())
            var post = this.fetchimages();
            //console.log(this.postArray)
            return post;
        },
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
        }
    },
    watch: {
        camera: function(id) {
            this.deviceId = id;
        },
        devices: function() {
            const [first, ...tail] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
    methods: {
        onCapture() {
            this.img = this.$refs.webcam.capture();
            ContentService.savePost(this.img)
        },
        onStarted(stream) {},
        onStopped(stream) {},
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {},
        onCameras(cameras) {
            this.devices = cameras;
        },
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
        }
    }
};

</script>
