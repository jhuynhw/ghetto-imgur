let size = 0;
console.log("testestetst")
function fadeOutEffect(id) {
  var e = document.getElementById(`${id}`);
  var e1 = setInterval(function () {
    if (!e.style.opacity) 
      e.style.opacity = 1;
    
    if (e.style.opacity > 0) 
      e.style.opacity -= 0.3;
    else {
      clearInterval(e1);
      remove(`${id}`);
      header(--size);
    }
  }, 100);
}

function remove(id) {
  let removediv = document.getElementById(`${id}`);
  removediv.parentNode.removeChild(removediv);
}

function addCode(title, image, id) {
  document.getElementById("output").insertAdjacentHTML(
    "afterbegin",
    `
<section id="id${id}" class="card" onclick="fadeOutEffect('id${id}')">
    <!-- top half -->
    <div class="card_image">

        <img id="image" src="${image}.png" />
    </div>
    <!-- bottom half -->
    <div class="card_info">
        <h3 id="ctitle">${title}</h3>
        <h5 id="date">Date:  Saturday, April 3, 2021, 12:00 PM PST</h5>
        <h5 id="author">Author: J.hnH</h5>
        <h4 id="note">Description: </h4>
        <h5 id="description_text">Check out this background I found on imgur</h5>
    </div>
</section>

`
  );
}
function header(size) {
  document.getElementById(
    "head"
  ).innerHTML = `<a id="author">Size: ${size}</a>`;
}

async function run() {
  try {
    let count = 0;
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/2/photos"
    );
    size = response.data.length;
    header(size);

    response.data.forEach((e) => {
      addCode(e.title, e.url, count++);
    });
  } catch (error) {
    console.log("error: ", error);
  }
}
run();