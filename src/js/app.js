window.onload = function(e){ 
  // Declare init HTML elements
  const camera = document.querySelector('#camera');
  const photo = document.querySelector('#photo');
  const open = document.querySelector('#open');
  const log_file = document.querySelector('.log_file');

  // Event to active input type file
  open.addEventListener('click', function(){
        $('.progress-bar').text('0%');
        $('.progress-bar').width('0%');
    camera.click();
  });
  
  // Event on change content type file
  camera.addEventListener('change', function(e) {
    // Create url object and show Photo from BLOB Object.
    photo.src = URL.createObjectURL(e.target.files[0]);

    // Create Http Request Instance.
 //   const xhttp = new XMLHttpRequest();
 /*   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) console.log(xhttp.responseText);
    }; */
    // Create Data Form Instance.
    const formData = new FormData();
    // Add blob object into instance.
    formData.append("photo", e.target.files[0]);
    // Open and send data to endpoint /upload
/*  xhttp.open('POST', window.location.href + 'upload', true);
    xhttp.send(formData); 
*/ 

$.ajax({
                url: '/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    alert(JSON.stringify(data));
                },

                xhr: function(){
                    var xhr = new XMLHttpRequest();

                    xhr.upload.addEventListener('progress', function(e){
                        if(e.lengthComputable){
                            var uploadPercent = e.loaded / e.total;
                            uploadPercent = (uploadPercent * 100);

                            $('.progress-bar').text(uploadPercent + '%');
                            $('.progress-bar').width(uploadPercent + '%');

                            if(uploadPercent == 100){
                                $('.progress-bar').text('Completed');
                                $('.completed').text('File Uploaded');
                            }
                        }
                    }, false);

                    return xhr;
                }
            });

  });
}