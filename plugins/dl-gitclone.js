import fetch from 'node-fetch'

let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el link del repositorio de *GitHub*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://api.github.com/repos/` ,m, rcanal)
  if (!regex.test(args[0])) {
    return conn.reply(m.chat, `Verifica que la *URL* sea de GitHub`, m).then(_ => m.react('✖️'))
  }
  let [_, user, repo] = args[0].match(regex) || []
  let sanitizedRepo = repo.replace(/.git$/, '')
  let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`
  let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`
  await m.react('🕓')
  try {
    let [repoResponse, zipResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(zipUrl),
    ])
    let repoData = await repoResponse.json()
    let filename = zipResponse.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    let type = zipResponse.headers.get('content-type')
    let img = 'https://i.ibb.co/tLKyhgM/file.png'
    let txt = `*乂  G I T H U B  -  D O W N L O A D*\n\n`
       txt += `	✩  *Nombre* : ${filename}\n`
       txt += `	✩  *Repositorio* : ${user}/${sanitizedRepo}\n`
       txt += `	✩  *Creador* : ${repoData.owner.login}\n`
       txt += `	✩  *Descripción* : ${repoData.description || 'Sin descripción disponible'}\n`
       txt += `	✩  *Url* : ${args[0]}\n\n`
       txt += `🚩 *${textbot}*`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m)
await m.react('✅')
  } catch {
await m.react('✖️')
  }
}
handler.help = ['gitclone *<url git>*']
handler.corazones = 2;
handler.tags = ['dl']
handler.command = /^(зшгрхщшрохщршоъ0шого)$/i
 
handler.Monedas = 1
export default handler
