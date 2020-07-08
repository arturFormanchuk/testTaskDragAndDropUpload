const dropRegion = document.getElementById("drop-region");
const imagePreviewRegion = document.getElementById("image-preview");
const fakeInput = document.createElement("input");

fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = true;
dropRegion.addEventListener('click', function() {
  fakeInput.click();
});

fakeInput.addEventListener("change", function() {
  const files = fakeInput.files;
  handleFiles(files);
});


function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault, false);
dropRegion.addEventListener('dragleave', preventDefault, false);
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', preventDefault, false);

function handleDrop(e) {
  const dt = e.dataTransfer,
    files = dt.files;

  if (files.length) {
    handleFiles(files);
  }

}

function draggingOver() {
  dropRegion.style.border= '3px solid green'
}

function draggingEnd(){
  dropRegion.style.border= '3px solid black'
}

dropRegion.addEventListener('drop', handleDrop, false);

function validateImage(image) {
  const validTypes = ['image/jpeg','image/jpg','image/pdf', 'image/png', 'image/gif'];
  if (validTypes.indexOf( image.type ) === -1) {
    alert("Invalid File Type");
    return false;
  }

  const maxSizeInBytes = 10e6;
  if (image.size > maxSizeInBytes) {
    alert("File too large");
    return false;
  }

  return true;

}

function handleFiles(files) {
  for (let i = 0, len = files.length; i < len; i++) {
    if (validateImage(files[i]))
      previewAndUploadImage(files[i]);
  }
}

function previewAndUploadImage(image) {

  // container
  const imgView = document.createElement("div");
  imgView.className = "image-view";
  imagePreviewRegion.appendChild(imgView);

  // previewing image
  const img = document.createElement("img");
  imgView.appendChild(img);

  // read the image...
  const reader = new FileReader();
  reader.onload = function(e) {
    img.src = e.target.result;
  };
  reader.readAsDataURL(image);

  // create FormData
  const formData = new FormData();
  formData.append('image', image);

  // upload the image
  const uploadLocation = 'https://api.imgbb.com/1/upload';
  formData.append('key', 'ab3feddf2ce3a29ddee2c6d4a82ab621');

  const options = {
    method: 'POST',
    body: formData
  };

  fetch(uploadLocation, options);

}
