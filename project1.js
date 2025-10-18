// Function to download PDF
function downloadPDF(fileName) {
    let link = document.createElement("a");
    link.href = `documents/${fileName}`; // The path to your legal PDF documents
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
