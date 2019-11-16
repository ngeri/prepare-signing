# Prepare signing for iOS app action

This action helps to provide certificates and provisioning profiles necessary for `xcodebuild`'s `archive` and `exportArchive` commands.

It can import the provided singing certificate into an unlocked keychain. It copies the provided provisioning profile into the folder `~/Library/MobileDevice/Provisioning Profiles`.

**Please only use this action with secrets!**

## Inputs

### `b64_prov`

**Required** Base64 encoded provisioning profile.

### `b64_cert`

**Required** Base64 encoded .p12 signing cert with private key.

### `p12_pw`

**Required** Password of the .p12 file.

### `kc_id`

**Optional** Id of the temporary keychain. Default `signing.ios`.

### `kc_pw`

**Optional** Password of temporary keychain. Default `signing.ios`.

## Example usage
```yaml
uses: ngeri/prepare-signing@v1
with:
 b64_prov: ${{ secrets.B64_PROV_DIST }}
 b64_cert: ${{ secrets.B64_CERT_DIST }}
 p12_pw: ${{ secrets.P12PW_DIST }}
 kc_id: ${{ secrets.KCID }}
 kc_pw: ${{ secrets.KCPW }}
```