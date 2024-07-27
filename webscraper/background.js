function handleCreated(tab) {
  browser.tabs.executeScript(tab.id, {
    file: "/js/atualiza_vaga.js",
  });
}

browser.tabs.onCreated.addListener(handleCreated);
