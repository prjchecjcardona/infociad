function genPDF() {
    var imgData = 'img/logo_ciad.png'
    var doc = new jsPDF();
    doc.setFont('nunito')
    doc.setFontSize(30)
    doc.text(40, 25, 'Informe Semanal')
    doc.addImage(imgData, 'png', 175, 2, 30, 30)
    doc.setLineWidth(0.5)
    doc.line(10, 30, 170, 30)
    doc.addPage();
    doc.text(20, 20, 'Esto es una prueba');
    doc.save('test_de_informes.pdf')
}



$('#button').click(function () {
    genPDF()
});