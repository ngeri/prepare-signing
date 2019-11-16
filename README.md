# Prepare signing for iOS build action

This action helps to provide necessary certificates and provisioning profiles for `xcodebuild`'s `archive` and `exportArchive` commands.

It can import the provided singing certificate into an unlocked keychain. It copies the provided provisioning profile into the folder `~/Library/MobileDevice/Provisioning Profiles`.

**Please use this action with secrets only!**

[How to add a secrets?](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)

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
- name: Prepare signing
  uses: ngeri/prepare-signing@v1.0.0
  with:
    b64_prov: ${{ secrets.B64_PROV }}
    b64_cert: ${{ secrets.B64_CERT }}
    p12_pw: ${{ secrets.P12_PW }}
    kc_id: ${{ secrets.KC_ID }}
    kc_pw: ${{ secrets.KC_PW }}
```
