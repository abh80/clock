(function () {
  const fs = require("fs");
  const { join } = require("path");
  fs.readFile("./observatories.json", "utf8", (error, m) => {
    if (error) return alert(error.toString());
    fs.readFile("./recent.json", "utf8", (err, file) => {
      let recent = JSON.parse(file);
      if (err) alert(err.toString());
      try {
        let i = 0;
        const data = JSON.parse(m);
        let filtered = data.filter((x) =>
          x.name.includes(JSON.parse(file).data[0])
        );
        document.getElementsByTagName(
          "body"
        )[0].innerHTML += `<h1>Found ${filtered.length} results matching</h1>`;
        filtered.forEach((elem) => {
          if (i > 4) i = 0;
          document.getElementsByTagName(
            "body"
          )[0].innerHTML += `<div class="cards-list"><div class="card"><div class="card_image"> <img src= "https:${elem.img}" /></div><div class="card_title title-white"><p>${elem.name}</p></div></div>`;
        });
        document.getElementById("loader").remove();
      } catch (E) {
        alert(E.toString());
      }
      document.getElementById("back-button").addEventListener("click", () => {
        try {
          const win = require("electron").remote.getCurrentWindow();
          win.loadURL(`file:////${join(process.cwd() + "/index.html")}`);
        } catch (e) {
          alert(e.toString());
        }
      });
      try {
        let keys = document.getElementsByClassName("card");
        try {
          for (let z = 0; z < keys.length; z++) {
            keys[z].addEventListener("click", () => {
              if (recent.selection.length > 4) recent.selection.splice(0, 4);
              recent.selection.unshift(keys[z].textContent);
              fs.writeFile(
                process.cwd() + "/recent.json",
                JSON.stringify(recent),
                () => {}
              );
              const win = require("electron").remote.getCurrentWindow();
              win.loadURL(`file:////${join(__dirname, "observatory.html")}`);
            });
          }
        } catch (E) {
          alert(E.toString());
        }
      } catch (E) {
        alert(E.toString());
      }
    });
  });
})();
