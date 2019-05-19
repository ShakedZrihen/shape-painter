/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class ImportBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    const files = document.getElementById("inputFile").files;
    if (files.length !== 1) {
      alert("Please choose one file and than press on import");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      paint.canvas.importCanvas(JSON.parse(reader.result));
    };

    reader.readAsText(files[0], "utf-8");
  }

  clearSelect() {}
  select() {}
}
