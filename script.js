(function () {
  const { join } = require("path");
  const win = require("electron").remote.getCurrentWindow();
  const fs = require("fs");
  fs.readFile(__dirname+"/recent.json", "utf8", (err, file) => {
    if (err) return alert(err.toString());
    try{

    const recent = JSON.parse(file);
    document
      .getElementById("searchbutton")
      .addEventListener("click", function () {
        let value = document.getElementById("searching").value;
        if (!value) return alert("No search query was provided");
        if (recent.data.length > 5) recent.data = recent.data.splice(0, 5);
        recent.data.unshift(value);
        fs.writeFile(__dirname + "/recent.json", JSON.stringify(recent), () => {});
         try{
        win.loadURL(`file:///${join(__dirname, "htmls/searchHtml.html")}`);
}catch(E){alert(E.toString())}
      });
    }catch(E){alert(E.toString())}
  });
})();
