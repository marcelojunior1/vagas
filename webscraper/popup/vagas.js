
const hidePage =  "body { border: 2px solid red; }";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function listenForClicks() {
  document.addEventListener("click", (e) => {

	function beastify(tabs) {

	  if (e.target.textContent === "Vagas") {
		  browser.tabs.sendMessage(tabs[0].id, {
			command: "get_vagas",
			beastURL: { "data": "OK" }
		  });
      } else {
		  fetch("http://127.0.0.1:8000/api/vagas?enable=false")
			  .then((response) => response.json())
			  .then((json) => {
				  let cont = 0;
				  for (let i in json.data) {
					  if (cont === 5) {
						  return;
					  }

					  browser.tabs.create({
						  url: "https://www.linkedin.com/jobs/view/" + json.data[i]._id,
					  });
					  cont += 1
				  }
			  });
	  }
	}

	function reset(tabs) {
	  browser.tabs.removeCSS({code: hidePage}).then(() => {
		browser.tabs.sendMessage(tabs[0].id, {
			command: "reset"
		});
	  });
	}


	if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
	  return;
	}

	if (e.target.type === "reset") {
	  browser.tabs.query({active: true, currentWindow: true})
		.then(reset)
	} else {
	  browser.tabs.query({active: true, currentWindow: true})
		.then(beastify)
	}
  });
}


browser.tabs.executeScript({file: "/vagas-ext.js"})
.then(listenForClicks)