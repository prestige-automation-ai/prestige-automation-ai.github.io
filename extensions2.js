const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`
//functions 

function generateTimeOptions() {
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  let options = '';
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options += `<option value="${timeValue}">${timeValue}</option>`;
    }
  }
  return options;
}

export const DateRangePicker = {
  name: 'DateRangePicker',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_dateRangePicker' || trace.payload.name === 'ext_dateRangePicker',
  render: ({ trace, element }) => {
    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0]; // format as 'YYYY-MM-DD'
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() + 1);
    const formattedMaxDate = maxDate.toISOString().split('T')[0];

    const formContainer = document.createElement('form');
    formContainer.innerHTML = `
      <style>
        .datetime-form {
          font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          max-width: 380px;
          margin: 20px auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        label {
          font-size: 16px;
          font-weight: 600;
          color: #334;
        }
        select, input[type="date"] {
          width: 100%;
          padding: 12px 20px;
          margin-top: 10px;
          border: 1px solid transparent;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-sizing: border-box;
          transition: all 0.3s;
          font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        select:hover, input[type="date"]:hover, select:focus, input[type="date"]:focus {
          border: 1px solid #007BFF;
          background-color: #ffffff;
          outline: none;
        }
        input[type="submit"] {
          background-color: #007BFF;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        input[type="submit"]:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="datetime-form">
        <label for="date-range">Choix de la période</label>
        <select id="date-range" name="date-range" required>
          <option value="today">Aujourd'hui</option>
          <option value="week">Semaine</option>
          <option value="month">Mois</option>
        </select>
        <label for="start-date">Date de début</label>
        <input type="date" id="start-date" name="start-date" required min="${minDate}" max="${formattedMaxDate}">
        <label for="end-date">Date de fin</label>
        <input type="date" id="end-date" name="end-date" required min="${minDate}" max="${formattedMaxDate}">
        <label for="time">Choix de l'heure</label>
        <select id="time" name="time" required>
          ${generateTimeOptions()}
        </select>
        <input type="submit" value="Réserver">
      </div>
    `;

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const dateRange = formContainer.querySelector('#date-range').value;
      const startDate = formContainer.querySelector('#start-date').value;
      const endDate = formContainer.querySelector('#end-date').value;
      const time = formContainer.querySelector('#time').value;
      console.log(`Selected Date Range: ${dateRange}, Start Date: ${startDate}, End Date: ${endDate}, Time: ${time}`);

      formContainer.querySelector('#date-range').disabled = true;
      formContainer.querySelector('#start-date').disabled = true;
      formContainer.querySelector('#end-date').disabled = true;
      formContainer.querySelector('#time').disabled = true;
      formContainer.querySelector('input[type="submit"]').disabled = true;

      // Typically handle the date and time data here, e.g., sending it to a server or using it in your application
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { dateRange, startDate, endDate, time }
      });
    });

    element.appendChild(formContainer);
  },
};

export const DateAndTimePicker = {
  name: 'DateAndTimePicker',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_dateTimePicker' || trace.payload.name === 'ext_dateTimePicker',
  render: ({ trace, element }) => {
    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0]; // format as 'YYYY-MM-DD'
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() + 1);
    const formattedMaxDate = maxDate.toISOString().split('T')[0];

    const formContainer = document.createElement('form');
    formContainer.innerHTML = `
      <style>
        .datetime-form {
          font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          max-width: 380px;
          margin: 20px auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        label {
          font-size: 16px;
          font-weight: 600;
          color: #334;
        }
        select, input[type="date"] {
          width: 100%;
          padding: 12px 20px;
          margin-top: 10px;
          border: 1px solid transparent;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-sizing: border-box;
          transition: all 0.3s;
          font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        select:hover, input[type="date"]:hover, select:focus, input[type="date"]:focus {
          border: 1px solid #007BFF;
          background-color: #ffffff;
          outline: none;
        }
        input[type="submit"] {
          background-color: #007BFF;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        input[type="submit"]:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="datetime-form">
        <label for="date">Choix de la date</label>
        <input type="date" id="date" name="date" required min="${minDate}" max="${formattedMaxDate}">
        <label for="time">Choix de l'heure</label>
        <select id="time" name="time" required>
          ${generateTimeOptions()}
        </select>
        <input type="submit" value="Réserver">
      </div>
    `;

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const date = formContainer.querySelector('#date').value;
      const time = formContainer.querySelector('#time').value;
      console.log(`Selected Date: ${date}, Time: ${time}`);

      formContainer.querySelector('#date').disabled = true;
      formContainer.querySelector('#time').disabled = true;
      formContainer.querySelector('input[type="submit"]').disabled = true;

      // Typically handle the date and time data here, e.g., sending it to a server or using it in your application
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date, time }
      });
      
    });

    element.appendChild(formContainer);
  },
};







export const HousingPreferencesForm = {
  name: 'HousingPreferences',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_housingPreferences' || trace.payload.name === 'ext_housingPreferences',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');
    formContainer.innerHTML = `
      <style>
        form {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: auto;
        }
        label {
          margin-top: 12px;
          display: block;
          color: #333;
        }
        input, select, textarea {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        input[type=submit] {
          width: auto;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        input[type=submit]:hover {
          background-color: #45a049;
        }
      </style>
      <label for="type_heb">Type d'hébergement:</label>
      <select id="type_heb" name="type_heb">
        <option value="Appartement">Appartement</option>
        <option value="Maison">Maison</option>
        <option value="Villa">Villa</option>
        <option value="Chalet">Chalet</option>
      </select>
      <label for="surface">Surface souhaitée (en m²):</label>
      <input type="number" id="surface" name="surface" min="20">
      <label for="rooms">Nombre de chambres:</label>
      <input type="number" id="rooms" name="rooms" min="1">
      <label for="features">Caractéristiques supplémentaires:</label>
      <textarea id="features" name="features" placeholder="Ajoutez des détails comme balcon, jardin, piscine, etc."></textarea>
      <input type="submit" value="Soumettre">
    `;

    formContainer.addEventListener('submit', function(event) {
      event.preventDefault();
      const type_heb = formContainer.querySelector('#type_heb').value;
      const surface = formContainer.querySelector('#surface').value;
      const rooms = formContainer.querySelector('#rooms').value;
      const features = formContainer.querySelector('#features').value;

      // Perform form validation or processing here
      console.log(`Type d'hébergement: ${type_heb}, Surface: ${surface}, Chambres: ${rooms}, Caractéristiques: ${features}`);

      // Assuming you have a way to send or process this data
      // For example:
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          type_heb,
          surface,
          rooms,
          features
        }
      });
    });

    element.appendChild(formContainer);
  },
};

export const FormExtensionWithDropdown = {
  name: 'ext_form2', // Extension name
  type: 'response', // Extension type indicating it handles responses
  match: ({ trace }) => trace.type === 'ext_form2' || trace.payload.name === 'ext_form2', // Condition for when this extension is triggered
  render: ({ trace, element }) => {
    // Function to render the form with a dropdown menu
    const formContainer = document.createElement('form'); // Create a form element dynamically

    // Set the inner HTML of the form, including input fields, a dropdown menu, and a submit button
    formContainer.innerHTML = `
  <style>
    form {
      font-family: Arial, sans-serif;
      background-color: #f3f3f3;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      margin: auto;
    }
    label {
      margin-top: 10px;
      display: block;
      color: #333;
    }
    input, select {
      width: 100%;
      padding: 8px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    input[type=submit] {
      width: auto;
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }
    input[type=submit]:hover {
      background-color: #45a049;
    }
  </style>
  <label for="arrivalDate">Date d'arrivée :</label>
  <input type="date" class="arrivalDate" name="arrivalDate">
  <label for="departureDate">Date de départ:</label>
  <input type="date" class="departureDate" name="departureDate">
  <label for="numPeople">Nombre de voyageurs:</label>
  <input type="number" class="numPeople" name="numPeople" min="1">
  <label for="type_heb">Choisissez le type d'hébergement:</label>
  <select name="type_heb" class="type_heb">
    <option value="Hotel">Hotêl</option>
    <option value="Gite">Gîte</option>
    <option value="Appartement">Appartement</option>
    <option value="Auberge de jeuness">Auberge de jeunesse</option>
    <option value="Chambre privee">Chambre privée</option>
  </select>
  <label for="city">Choisissez votre destination:</label>
  <select name="city" class="city">
    <option value="Paris">Paris</option>
    <option value="Lyon">Lyon</option>
    <option value="Marseille">Marseille</option>
    <option value="Bordeaux">Bordeaux</option>
    <option value="Nice">Nice</option>
  </select>
  <input type="submit" class="submit" value="Soumettre">
`;


const arrivalDateInput = formContainer.querySelector('.arrivalDate');
const departureDateInput = formContainer.querySelector('.departureDate');

arrivalDateInput.addEventListener('change', function() {
  departureDateInput.setAttribute('min', this.value);
});
    // Attach an event listener to the form for handling the submit event
    formContainer.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission behavior
    
      const arrivalDate = formContainer.querySelector('.arrivalDate').value;
      const departureDate = formContainer.querySelector('.departureDate').value;

      const numPeople = formContainer.querySelector('.numPeople').value;
      const type_heb = formContainer.querySelector('.type_heb').value; // Get selected type of accommodation from the dropdown
      const city = formContainer.querySelector('.city').value; // Get selected city from the dropdown

      
    
      // Perform validation
      if (
        !arrivalDate ||
        !departureDate ||
        !numPeople ||
        !type_heb ||
        !city
      ) {
        // Optionally, you can add visual feedback for invalid fields
        // For instance, adding a CSS class to highlight invalid fields
        // and preventing form submission if any field is invalid
        return;
      }
    
      // Simplify the logic: Remove the submit button after submission without validation checks
      formContainer.querySelector('.submit').remove();
      
      // Programmatically submit the form data
      window.voiceflow.chat.interact({ 
        type: 'complete', 
        payload: { 
          arrivalDate, 
          departureDate, 
          numPeople, 
          type_heb, 
          city 
        } 
      });
    });
    
    element.appendChild(formContainer); // Append the form to the specified DOM element
  
  },
};

export const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_form' || trace.payload.name === 'ext_form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="text"], input[type="email"], input[type="tel"] {
              width: 100%;
              border: none;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              background: transparent;
              margin: 5px 0;
              outline: none;
            }
            .phone {
              width: 150px;
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
            }
          </style>

          <label for="name">Name</label>
          <input type="text" class="name" name="name" required><br><br>

          <label for="email">Email</label>
          <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Invalid email address"><br><br>

          <label for="phone">Phone Number</label>
          <input type="tel" class="phone" name="phone" required pattern="\\d+" title="Invalid phone number, please enter only numbers"><br><br>

          <input type="submit" class="submit" value="Submit">
        `

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const name = formContainer.querySelector('.name')
      const email = formContainer.querySelector('.email')
      const phone = formContainer.querySelector('.phone')

      if (
        !name.checkValidity() ||
        !email.checkValidity() ||
        !phone.checkValidity()
      ) {
        name.classList.add('invalid')
        email.classList.add('invalid')
        phone.classList.add('invalid')
        return
      }

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { name: name.value, email: email.value, phone: phone.value },
      })
    })

    element.appendChild(formContainer)
  },
}

export const MapExtension = {
  name: 'Maps',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_map' || trace.payload.name === 'ext_map',
  render: ({ trace, element }) => {
    const GoogleMap = document.createElement('iframe')
    const { apiKey, origin, destination, height, width } = trace.payload
    

    GoogleMap.width = width || '240'
    GoogleMap.height = height || '240'
    GoogleMap.style.border = '0'
    GoogleMap.loading = 'lazy'
    GoogleMap.allowFullscreen = true
    GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`

    element.appendChild(GoogleMap)
  },
}

export const VideoExtension = {
  name: 'Video',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_video' || trace.payload.name === 'ext_video',
  render: ({ trace, element }) => {
    const videoElement = document.createElement('video')
    const { videoURL, autoplay, controls } = trace.payload

    videoElement.width = 240
    videoElement.src = videoURL

    if (autoplay) {
      videoElement.setAttribute('autoplay', '')
    }
    if (controls) {
      videoElement.setAttribute('controls', '')
    }

    videoElement.addEventListener('ended', function () {
      window.voiceflow.chat.interact({ type: 'complete' })
    })
    element.appendChild(videoElement)
  },
}

export const TimerExtension = {
  name: 'Timer',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_timer' || trace.payload.name === 'ext_timer',
  render: ({ trace, element }) => {
    const { duration } = trace.payload || 5
    let timeLeft = duration

    const timerContainer = document.createElement('div')
    timerContainer.innerHTML = `<p>Time left: <span id="time">${timeLeft}</span></p>`

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown)
        window.voiceflow.chat.interact({ type: 'complete' })
      } else {
        timeLeft -= 1
        timerContainer.querySelector('#time').textContent = timeLeft
      }
    }, 1000)

    element.appendChild(timerContainer)
  },
}

export const FileUploadExtension = {
  name: 'FileUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_fileUpload' || trace.payload.name === 'ext_fileUpload',
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement('div')
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
    `

    const fileInput = fileUploadContainer.querySelector('input[type=file]')
    const fileUploadBox = fileUploadContainer.querySelector('.my-file-upload')

    fileUploadBox.addEventListener('click', function () {
      fileInput.click()
    })

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0]
      console.log('File selected:', file)

      fileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

      var data = new FormData()
      data.append('file', file)

      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Upload failed: ' + response.statusText)
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
          console.log('File uploaded:', result.data.url)
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              file: result.data.url.replace(
                'https://tmpfiles.org/',
                'https://tmpfiles.org/dl/'
              ),
            },
          })
        })
        .catch((error) => {
          console.error(error)
          fileUploadContainer.innerHTML = '<div>Error during upload</div>'
        })
    })

    element.appendChild(fileUploadContainer)
  },
}

export const KBUploadExtension = {
  name: 'KBUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_KBUpload' || trace.payload.name === 'ext_KBUpload',
  render: ({ trace, element }) => {
    const apiKey = trace.payload.apiKey || null
    const maxChunkSize = trace.payload.maxChunkSize || 1000
    const tags = `tags=${JSON.stringify(trace.payload.tags)}&` || ''
    const overwrite = trace.payload.overwrite || false

    if (apiKey) {
      const kbfileUploadContainer = document.createElement('div')
      kbfileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' accept='.txt,.text,.pdf,.docx' style='display: none;'>
    `

      const fileInput = kbfileUploadContainer.querySelector('input[type=file]')
      const fileUploadBox =
        kbfileUploadContainer.querySelector('.my-file-upload')

      fileUploadBox.addEventListener('click', function () {
        fileInput.click()
      })

      fileInput.addEventListener('change', function () {
        const file = fileInput.files[0]

        kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

        const formData = new FormData()
        formData.append('file', file)

        fetch(
          `https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload?${tags}overwrite=${overwrite}&maxChunkSize=${maxChunkSize}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: apiKey,
            },
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Upload failed: ' + response.statusText)
              window.voiceflow.chat.interact({
                type: 'error',
                payload: {
                  id: 0,
                },
              })
            }
          })
          .then((result) => {
            kbfileUploadContainer.innerHTML =
              '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
            window.voiceflow.chat.interact({
              type: 'complete',
              payload: {
                id: result.data.documentID || 0,
              },
            })
          })
          .catch((error) => {
            console.error(error)
            kbfileUploadContainer.innerHTML = '<div>Error during upload</div>'
          })
      })
      element.appendChild(kbfileUploadContainer)
    }
  },
}

export const DateExtension = {
  name: 'Date',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_date' || trace.payload.name === 'ext_date',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    // Get current date
    let currentDate = new Date()
    let minDate = new Date()
    minDate.setMonth(currentDate.getMonth())
    let maxDate = new Date()
    maxDate.setMonth(currentDate.getMonth() + 12)

    // Convert to ISO string and remove the time part
    let minDateString = minDate.toISOString().slice(0, 10) // Keep only the date part
    let maxDateString = maxDate.toISOString().slice(0, 10) // Keep only the date part

    formContainer.innerHTML = `
    <style>
    /* Container for the date picker to add some padding and ensure everything is centrally aligned */
    .meeting {
      padding: 20px;
      text-align: center;
      background-color: #f8f8f8;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      max-width: 300px; /* Set a max-width for the form container */
      margin: auto; /* Center the form container */
    }
  
    /* Styling for the date input field */
    input[type="date"] {
      width: 95%;
      padding: 12px;
      border: 2px solid #ddd; /* Light grey border */
      border-radius: 20px; /* Rounded corners */
      margin-top: 10px; /* Add some space above the input field */
      box-sizing: border-box; /* Includes padding and border in the element's total width and height */
      font-family: Arial, sans-serif; /* Modern font */
      font-size: 16px; /* Larger font size for better readability */
      background-color: #fff; /* White background */
      cursor: pointer; /* Change cursor to pointer when hovering over the input */
    }
  
    /* Styling for the submit button */
    .submit {
      width: 100%;
      padding: 12px;
      border-radius: 20px; /* Rounded corners */
      border: none;
      color: #fff; /* White text */
      background-color: #007bff; /* Bootstrap primary color */
      font-family: Arial, sans-serif; /* Modern font */
      font-size: 16px; /* Larger font size for readability */
      margin-top: 20px; /* Add some space above the button */
      cursor: pointer; /* Change cursor to pointer when hovering over the button */
      transition: background-color 0.3s ease; /* Smooth background color change on hover */
    }
  
    /* Change button color slightly when hovered over */
    .submit:hover {
      background-color: #0056b3;
    }
  
    /* Disable button style */
    .submit:disabled {
      background-color: #cccccc;
      cursor: not-allowed; /* Change cursor to indicate the button is disabled */
    }
  </style>
  <label for="date">Select your date</label><br>
  <div class="meeting">
    <input type="date" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}">
    <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
  </div>
  
          `

    const submitButton = formContainer.querySelector('#submit')
    const dateInput = formContainer.querySelector('#meeting')

    dateInput.addEventListener('input', function () {
      submitButton.disabled = !this.value;
    })
    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const date = dateInput.value
      console.log(date)

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date: date },
      })
    })
    element.appendChild(formContainer)
  },
}


export const ConfettiExtension = {
  name: 'Confetti',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_confetti' || trace.payload.name === 'ext_confetti',
  effect: ({ trace }) => {
    const canvas = document.querySelector('#confetti-canvas')

    var myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })
    myConfetti({
      particleCount: 200,
      spread: 160,
    })
  },
}

export const FeedbackExtension = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_feedback' || trace.payload.name === 'ext_feedback',
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement('div')

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: none; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: none; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `

    feedbackContainer
      .querySelectorAll('.vfrc-feedback--button')
      .forEach((button) => {
        button.addEventListener('click', function (event) {
          const feedback = this.getAttribute('data-feedback')
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { feedback: feedback },
          })

          feedbackContainer
            .querySelectorAll('.vfrc-feedback--button')
            .forEach((btn) => {
              btn.classList.add('disabled')
              if (btn === this) {
                btn.classList.add('selected')
              }
            })
        })
      })

    element.appendChild(feedbackContainer)
  },
}
