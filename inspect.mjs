import mammoth from 'mammoth'

const { value } = await mammoth.extractRawText({
  path: 'data/ONGD_SALAAM_Dossier_Complet_Informations_et_Images-e64626.docx',
})
console.log(value)
