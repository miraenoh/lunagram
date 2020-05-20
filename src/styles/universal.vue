<style>
:root {
  --luna-primary: #0095f6;
  --luna-lightgray: #dfdfdf;
}

html {
  overflow-y: scroll;
}

main {
  padding-top: 30px;
}

a {
  font-weight: 600;
  color: inherit;
}

a:hover {
  text-decoration: none !important;
  color: inherit;
}

.card {
  font-size: 14px;
  margin-bottom: 60px;
}

/* For modals */
.luna-modal {
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.luna-modal-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

/* For square images */
.luna-square:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.luna-square-img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
