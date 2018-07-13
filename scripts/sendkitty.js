module.exports = async function sendCat(cheshire) {
    const a = await cheshire.sendKitty(
      cheshire.accounts[0].address,
      cheshire.accounts[9].address,
      3,
    )
  
    console.log(`done`)
  }