const core = require('@actions/core');
const shell = require('shelljs');

try {
  const b64Prov = core.getInput(`b64_prov`);
  const b64Cert = core.getInput(`b64_cert`);
  const p12Pw = core.getInput(`p12_pw`);
  const kcId = core.getInput(`kc_id`);
  const kcPw = core.getInput(`kc_pw`);

  const kcName = `${kcId}.keychain`
  const tmpProv=`Prov.mobileprovision`
  const tmpCert=`Cert.p12`
  
  shell.exec(`(echo ${b64Prov} | base64 --decode) > ${tmpProv}`)  
  shell.exec(`mkdir -p ~/Library/MobileDevice/Provisioning\\ Profiles`)
  shell.exec(`cp ${tmpProv} ~/Library/MobileDevice/Provisioning\\ Profiles/${tmpProv}`)
  shell.exec(`(echo ${b64Cert} | base64 --decode) > ${tmpCert}`)
  shell.exec(`security create-keychain -p ${kcPw} ${kcName}`)
  shell.exec(`security list-keychains -d user -s login.keychain ${kcName}`)
  shell.exec(`security import ${tmpCert} -k ${kcName} -P ${p12Pw} -T /usr/bin/codesign`)
  shell.exec(`security set-keychain-settings -lut 1000 ${kcName}`)
  shell.exec(`security unlock-keychain -p ${kcPw} ${kcName}`)
  shell.exec(`security set-key-partition-list -S apple-tool:,apple: -s -k ${kcPw} ${kcName}`)
  shell.exec(`rm ${tmpProv}`)
  shell.exec(`rm ${tmpCert}`)

} catch (error) {
  core.setFailed(error.message);
}