<template>
    <div class="container">
        <!-- <div class="header d-flex flex-ai-center"> -->
                <!-- <vue-web-cam
                    ref="webcam"
                    :device-id="deviceId"
                    width="100%"
                    @started="onStarted"
                    @stopped="onStopped"
                    @error="onError"
                    @cameras="onCameras"
                    @camera-change="onCameraChange"
                /> -->

          <!-- <span class="flex-1">Photo</span>
        <button>Photo</button>
          <button class="icon-button p-3"
          @click="close"
          >
            <v-icon name="times" />
          </button>
        </div> -->

        <div class="content pb-2">
          <Error v-if="error" :error="error" @dismiss="() => error = null"/>
          <video id="previewVideo" autoplay="true"
            :src-object.prop.camel="previewSrc"
            v-show="hasPreview"
          />
          <div class="canvas-container d-flex">
            <canvas id="previewCanvas" v-show="hasPreview"/>
            <img v-for="(sticker, i) in stickers" :key="i"
              :data-sticker-id="i" :alt="sticker.name"
              :src="sticker.pic" class="floating-sticker"/>
          </div>

          <div class="d-flex flex-ai-center p-3">
            <!-- Take picture button -->
            <button class="icon-button flex-1"
                  v-show="hasPreview"
                  :disabled="!canTakePicture"
                  @click="takePicture()"
            >
              <div class="d-block">
                <v-icon name="camera"/>
              </div>
              <div class="d-block mt-1">
                  <span>Take picture</span>
              </div>
            </button>

            <button class="icon-button flex-1"
            v-show="hasPreview"
              @click="uploadLocal()"
            >
              <div class="d-block">
                <v-icon name="file-upload"/>
              </div>
              <div class="d-block mt-1">
                <span>Upload file</span>
              </div>
            </button>

            <!-- Discard picture button -->
            <button class="icon-button flex-1"
              v-show="hasPreview"
              @click="discardPicture()"
            >
              <div class="d-block">
                <v-icon name="trash" />
              </div>
              <div class="d-block mt-1">
                <span>Discard photo</span>
              </div>
            </button>

            <!-- Download picture button -->
            <button class="icon-button flex-1"
              v-show="hasPreview"
              @click="downloadPicture()"
            >
              <div class="d-block">
                <v-icon name="file-download" />
              </div>
              <div class="d-block mt-1">
                <span>Download photo</span>
              </div>
            </button>


          <Error v-if="error" :error="error" @dismiss="() => error = null"/>

          <!-- Sticker section -->
          <div v-show="hasPreview" class="d-flex flex-jc-center mt-1 mb-1 pb-2 pt-2"
            style="align-items: flex-start; overflow-y: auto; flex-wrap: wrap;">
            <span style="flex: 0 0 100%;" class="mb-1 mt-1">Stickers</span>
            <button class="sticker" v-for="sticker of stickerList"
              :key="sticker.name"
              :style="{ 'background-image': `url(${sticker.pic})` }"
            @click="e => onInsertSticker(e, sticker)"
            >
            {{ sticker.name }}
            </button>
          </div>

          <!-- Publish section -->
          <div v-show="hasPreview" class="publish d-flex flex-col pl-2 pr-2 mb-2">
            <!-- <span>Post</span> -->
            <div>
              <input type="text" placeholder="Say something about this picture"
                v-model="text" class="input">
            </div>
            <!-- Publish button -->
            <AsyncButton
            :loading="uploading"
            @click.prevent="uploadPicture"
            class="suggested mt-2 ml-auto">
              Publish now
            </AsyncButton>
          </div>
      </div>

      <div class="row mt-2 d-flex justify-content-center">
          <div class="col-md-4">
            <label for="device">Camera</label>
            <select
                  v-model="camera"
                  name="device"
                  id="device"
                  class="form-control"
            >
            <option>Selectionnez votre camera</option>
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
</template>

<script>
import { WebCam } from "vue-web-cam";
import axios from 'axios';
import ContentService from '../services/content.service.js'
import mergeImages from 'merge-images';
import store from '../store/'
import stickerList from '@/store/stickerlist.module'
import AsyncButton from '@/components/AsyncButton.vue';
import Error from '@/components/Error.vue'
import Camera from "@/modules/camera.module";
import 'vue-awesome/icons';


const API_URL = 'http://localhost:8080/api';
import { Icon } from '@fortawesome/vue-fontawesome';


export default {
        name: "Montage",
    props: {
    },
    components: {
        AsyncButton,
        Error
        //"vue-web-cam": WebCam
    },
        data() {
        return {
            postArray: [],
            img: null,
            camera: null,
            deviceId: null,
            devices: [],
            imagePath: '',
            postUpdateKey: 0,

                  canTakePicture: false,
      canvas: null,
      cc: null,
      currentFilter: null,
      error: null,
      hasPreview: true,
      originalMime: null,
      originalPic: null,
      previewSrc: null,
      stickerList,
      stickers: [],
      text: null,
      uploading: false,
      video: null,
        };
    },

        methods: {
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
        },

        getUserLastPosts(){
            this.postUpdateKey =+ 1
            console.log('getting user last posts')
            var userID = this.$store.state.auth.user.id
            axios.get(API_URL + '/getuserlastposts',{
            params: {
                author : userID
            }
            //author : this.$store.state.auth.user.id
        })
        .then((res) => {
            //console.log(res)
            var post = res
            this.postArray = res.data;
            //console.log(this.img)
            return post
        })
        },
        
            cameraInit() {
      return new Promise((resolve, reject) => {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
          return reject(new Error('Unsupported'));

        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => resolve(stream))
          .catch((err) => reject(err));
      });
    },


    onInsertSticker(e, sticker) {
      this.stickers.push(sticker);
    },
        /**
     * close()
     */
    close() {
      //this.$store.commit('setShowUpload', false);
    },
    /**
     * discardPicture()
     */
    discardPicture() {
      this.originalPic = null;
      this.originalMime = null;
      //this.hasPreview = false;
      this.stickers = [];
      var canvas = document.getElementById('previewCanvas')
      canvas.remove()
    },
    /**
     * takePicture()
     * - gets the current frame from the video
     * - draws it to the canvas
     * - copies the drawing to this.originalPic and sets this.hasPreview
     * - applies the image data to the filter buttons
     * - applies the filters to the filter buttons
     * - calls realApplyFilter
     */
    takePicture() {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;

      this.originalMime = null;
      this.draw(this.video, this.video.videoWidth, this.video.videoHeight);

    },
    /**
     * downloadPicture()
     * - creates a virtual a tag
     * - sets it to a blob of this.canvas
     * - clicks the a tag to download
     */
      downloadPicture() {
      if (!this.hasPreview)
        return ;

      let a    = document.createElement('a');
      let name = `camagru-pic-${Date.now()}.png`;

      a.download = name;

      this.getFinalPicture()
        .then((canvas) => {
          canvas.toBlob((blob) => {
            a.href = URL.createObjectURL(blob);
            a.click();
          });
        });
    },
    /**
     * draw(source, width, height)
     * - draws on previewCanvas from source with width width and height height
     * - generates and draws smaller previews for filter buttons
     *
     * @param {CanvasImageSource} source
     * @param {Number} width
     * @param {Number} height
     */
    draw(source, width, height) {
      this.canvas.width = width;
      this.canvas.height = height;

      let ctx = this.canvas.getContext('2d');

      ctx.drawImage(source,
        // Source x, y, w, h (from original image)
        0, 0, width, height,
        // Dest x, y, w, h (to canvas)
        0, 0, this.canvas.width, this.canvas.height);

      this.hasPreview = true;
      this.originalPic =
        ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

      // Hack: create a smaller off-screen canvas to make thumbnails for filters
      let offCanvas = document.createElement('canvas');
      let offCtx = offCanvas.getContext('2d');
      let ratio = width / height;

      offCanvas.width = 300;
      offCanvas.height = 300 / ratio;

      offCtx.drawImage(source,
        0, 0, width, height,
        0, 0, offCanvas.width, offCanvas.height);

    },
    /**
     * getFinalPicture()
     * - get the mix of canvas + stickers as one
     * @returns {Promise<Canvas>}
     */
    getFinalPicture() {
      return new Promise((resolve) => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);

        let rect = this.cc.getBoundingClientRect();
        let rx = this.canvas.width / rect.width;
        let ry = this.canvas.height / rect.height;

        let floats = document.querySelectorAll(`.floating-sticker`);
        floats.forEach((el) => {
          ctx.drawImage(el,
            0, 0,
            el.naturalWidth, el.naturalHeight,
            el.offsetLeft * rx, el.offsetTop * ry,
            50 * rx, 50 * ry);
        });

        return resolve(canvas);
      });
    },
    /**
     * async uploadPicture()
     */

    async uploadPicture() {
      if (!(this.text && this.text.trim() != '' && this.hasPreview))
        return ;

      console.log('uploading picture')

      this.error = null;
      this.uploading = true;

      try {
        const payload = {
          text: this.text,
          author: store.state.auth.user.id,
          date: Date.now(),
          img: (await this.getFinalPicture()).toDataURL(this.originalMime || 'image/png', 0.9)
        };
        console.log(this.originalMime);
        // Don't actually know what the limit is, but it's under 20Mb
        if (payload.img[0].length / 1000000 > 20) {
          this.error = 'File is over the size limit';
          return ;
        }
        let { data } = await axios.post(API_URL + '/upload-image', payload);
        // TODO: find a way to add the post in data to the feed
        data.user = {
          _id: store.state.auth.user.id,
          username: store.state.auth.user.username,
          picture: store.state.auth.user.picture,
        };
        this.$bus.$emit('new-post', data);
        this.close();
      }
      catch(err) {
        console.log(err)
        if (err.response)
          this.error = err.response.data.error;
        else {
          this.error = 'Network error.';
        }
      }
      finally { this.uploading = false }
    },

    /**
     * uploadLocal() get a file from the client's device
     */
    uploadLocal() {
      let i = document.createElement('input');
      i.type = 'file';
      i.accept = 'image/*';
      i.click();
      i.addEventListener('change', () => {
        let reader = new FileReader();
        reader.onload = () => {
          let img = new Image();
          img.onload = () => {
            this.draw(img, img.width, img.height);
            this.realApplyFilter();
          };
          img.src = reader.result;
        };
        this.originalMime = i.files[0].type;
        reader.readAsDataURL(i.files[0]);
      });
    },
    },
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

    mounted() {
        this.getUserLastPosts()

        this.video = document.createElement('video');
        this.canvas = document.getElementById('previewCanvas');

        this.hasPreview = true;

        Camera.init()
        .then((stream) => {
          this.previewSrc = this.video.srcObject = stream;
          console.log(this.video)
          // Wait for first frame to be drawn to enable taking pictures
          this.video.addEventListener('loadeddata', () => {
            this.canTakePicture = true;
          });
          // Start the video (maybe unecessary since autoplay="true"?)
          this.video.play();
        })
        .catch((err) => {
          this.error = "Can't access camera :(";
          err;
        });

        this.cc = document.querySelector('div.canvas-container');
        let target = null;
        let click = { sx: null, sy: null, cx: null, cy: null };

        const onMouseUp = (e) => {
        e.preventDefault();
        target.classList.remove('moving');

        // Remove listeners
        document.onmousemove = null;
        document.onmouseup = null;
        };

        const onMouseMove = (e) => {
        e.preventDefault();

        click.cx = click.sx - e.clientX;
        click.cy = click.sy - e.clientY;
        click.sx = e.clientX;
        click.sy = e.clientY;

        let b = this.cc.getBoundingClientRect();

        target.style.left = `${
          Math.min(
            Math.max(e.clientX - 25 - b.left, 0),
            b.width - 50
          )
        }px`;

        target.style.top = `${
          Math.min(
            Math.max(e.clientY - 25 - b.top, 0),
            b.height - 50
          )
        }px`;
      };

      this.cc.addEventListener('mousedown', (e) => {
        if (!e.target) return ;

        if (e.target.classList.contains('floating-sticker')) {
          e.preventDefault();
          target = e.target;
          target.classList.add('moving');
          // Click start
          click.sx = e.clientX;
          click.sy = e.clientY;
          document.onmousemove = onMouseMove;
          document.onmouseup = onMouseUp;
        }
      });

    },
    computed: {
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

      beforeDestroy() {
    // Stop using webcam once the component is destroyed (on $emit('close'))
    if (this.previewSrc) {
      this.video.pause();
      this.previewSrc.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
};

</script>

<style scoped>
img {
  width: 20vw;
  height: auto;
}


.upload {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  width: 90%;
  max-width: 400px;
  height: 90%;
  background: white;
  border-radius: 6px;
  position: relative;
  padding-top: 45px;
}

.content {
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
}

.header {
  height: 45px;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.header > button {
  position: absolute;
  right: 0;
  height: 45px;
}

video,
canvas {
  max-width: 100%;
  max-height: 300px;
  margin: 0 auto;
}

button.filter {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0;
  border: none;
  background-size: cover;
  background-position: center;
  box-shadow:0 1px 2px rgba(0, 0, 0, .3);
}

button.filter.active {
  border: 2px solid black;
}

button.filter canvas {
  width: 50px;
  height: 50px;
}

.hidden {
  display: none;
}

button.sticker {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  border: 2px solid transparent;
  margin: 5px;
}

button.sticker.active {
  border-color: #42b4b9;
}

div.canvas-container {
  position: relative;
}

div.canvas-container .floating-sticker {
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
  width: 50px;
  height: 50px;
}

div.canvas-container .floating-sticker.moving {
  cursor: move;
}

</style>