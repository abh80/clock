(function () {
  const { join } = require("path");
  const { readFile, writeFile } = require("fs");
  try {
    readFile(process.cwd() + "/observatories.json", (err, file) => {
      if (err) alert(err.toString());
      let data = JSON.parse(file);
      readFile(process.cwd() + "/recent.json", (error, m) => {
        try {
          if (error) return alert(error.toString());
          let recent = JSON.parse(m);
          let observatory = data.find(
            (x) => x.name === recent.selection[0].slice(1)
          );
          if (!observatory) return alert("no observatory");
          document.getElementsByTagName(
            "body"
          )[0].innerHTML += `<div class = "image" ><h1>${observatory.name}<h1><img src = "https:${observatory.img}" /></div><div class = "info"><p>${observatory.body}</p></div>`;
          let tabletxt =
            '<table style="width:22em" border = "1"><caption>Table Data from wikipedia</caption><tbody>';
          for (let z = 0; z < observatory.table.length; z++) {
            tabletxt += `<tr><th scope = "row">${observatory.table[z].type}</th><td>${observatory.table[z].value}</td>`;
          }
          tabletxt += "</tbody></table>";
          document.getElementsByTagName("body")[0].innerHTML += tabletxt;
          document.getElementById("loader").remove();
        } catch (E) {
          alert(E.toString());
        }
        document.getElementById("back-button").addEventListener("click", () => {
          const win = require("electron").remote.getCurrentWindow();
          win.loadURL(`file:////${join(__dirname, "searchHtml.html")}`);
          return;
        });
      });
    });
  } catch (E) {
    alert(E.toString());
  }
})();
