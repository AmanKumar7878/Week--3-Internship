document.addEventListener("DOMContentLoaded", function () {
    const inputText = document.getElementById("inputText");
    const generateButton = document.getElementById("generateButton");
    const downloadLink = document.getElementById("downloadLink");
    const barcodeContainer = document.getElementById("barcodeContainer");
  
    generateButton.addEventListener("click", function () {
      const text = inputText.value;
      if (text) {
        generateBarcode(text);
      }
    });
  
    function generateBarcode(text) {
      JsBarcode("#generateButton", text, {
        format: "CODE128",
        fontSize: 18,
      });
  
      // Convert barcode to an image and download it
      const barcodeImage = document.querySelector("#barcodeContainer svg");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const img = new Image();
  
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
  
        // Convert canvas to data URL and set it as the download link href
        downloadLink.href = canvas.toDataURL("image/png");
  
        // Show download link
        downloadLink.style.display = "block";
      };
  
      img.src = "data:image/svg+xml;base64," + btoa(barcodeImage.outerHTML);
    }
  });
  