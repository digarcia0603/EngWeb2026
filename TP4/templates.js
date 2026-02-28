const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.examesListPage = (tlist, d) => renderPug('index', { list: tlist, date: d });
exports.exameFormPage = (d) => renderPug('form', { date: d });
exports.examePage = (e, d) => renderPug('emd', { exame: e, date: d });
exports.exameEditPage = (e, d) => renderPug('emdFormEdit', { exame: e, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });