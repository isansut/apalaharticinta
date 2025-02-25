const puppeteer = require("puppeteer");
const { generateMnemonic, EthHdWallet } = require("eth-hd-wallet");

(async () => {
    console.log("🚀 Memulai Auto Registrasi Kaia Portal...");

    // Generate Wallet
    const mnemonic = generateMnemonic();
    const wallet = EthHdWallet.fromMnemonic(mnemonic);
    wallet.generateAddresses(1);
    const address = wallet.getAddresses()[0];
    const privateKey = wallet.getPrivateKey(address).toString("hex");

    console.log(`🔹 Address: ${address}`);
    console.log(`🔑 Private Key: 0x${privateKey}`);
    console.log(`📝 Mnemonic: ${mnemonic}`);

    // Path MetaMask
    const metamaskPath = "D:/BELAJAR KALO GAMALES/NODEJS/kaiaportal/metamask";

    // Launch browser with MetaMask
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            `--disable-extensions-except=${metamaskPath}`,
            `--load-extension=${metamaskPath}`
        ]
    });

    console.log("⏳ Menunggu MetaMask terbuka...");
    // Tunggu halaman loading
await new Promise(resolve => setTimeout(resolve, 3000));


    // Cari tab MetaMask
    const metamaskPage = (await browser.pages()).find(p => p.url().includes("chrome-extension://"));
    
    if (metamaskPage) {
        console.log("✅ MetaMask terbuka");

        // Masuk ke halaman import wallet secara langsung
        const metamaskExtensionId = metamaskPage.url().split("/")[2]; // Ambil ID ekstensi MetaMask
        await metamaskPage.goto(`chrome-extension://${metamaskExtensionId}/home.html#unlock`);

        // Tunggu halaman loading
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Klik tombol "I Agree" kalau ada
try {
    await metamaskPage.waitForSelector("#onboarding__terms-checkbox", { visible: true, timeout: 5000 });
    await metamaskPage.click("#onboarding__terms-checkbox");
    console.log("✅ Checkbox persetujuan dicentang");
} catch (error) {
    console.log("⚠️ Tidak ada checkbox persetujuan, lanjut...");
}





        // Klik tombol "Import Wallet"
        await metamaskPage.waitForSelector("button[data-testid='onboarding-import-wallet']", { visible: true });
        await metamaskPage.click("button[data-testid='onboarding-import-wallet']");
        console.log("✅ Klik tombol Import Wallet");

        // Klik tombol "I Agree" kalau ada
        try {
            await metamaskPage.waitForSelector("button[data-testid='metametrics-i-agree']", { visible: true, timeout: 5000 });
            await metamaskPage.click("button[data-testid='metametrics-i-agree']");
            console.log("✅ Klik I Agree (jika ada)");
        } catch (error) {
            console.log("⚠️ Tidak ada tombol I Agree, lanjut...");
        }

        // Tunggu input seed phrase pertama muncul
await metamaskPage.waitForSelector("#import-srp__srp-word-0", { visible: true });
console.log("✅ Form input seed phrase ditemukan");

// Pisahkan mnemonic menjadi array kata
const words = mnemonic.split(" ");

// Loop untuk mengisi setiap input seed phrase
for (let i = 0; i < words.length; i++) {
    const selector = `#import-srp__srp-word-${i}`;
    await metamaskPage.waitForSelector(selector, { visible: true });
    await metamaskPage.type(selector, words[i], { delay: 100 }); // Delay biar tidak terlalu cepat
}

console.log("✅ Seed phrase berhasil dimasukkan");

// Tunggu tombol "Confirm" muncul
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.import-srp__actions > div > button", { visible: true });

// Klik tombol "Confirm"
await metamaskPage.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.import-srp__actions > div > button");

console.log("✅ Klik tombol Confirm untuk mengimpor wallet");



        // Tunggu input password utama
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > div:nth-child(1) > label > input", { visible: true });

// Isi password
await metamaskPage.type("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > div:nth-child(1) > label > input", "password123", { delay: 100 });

console.log("✅ Password berhasil dimasukkan");

// Tunggu input konfirmasi password
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > div:nth-child(2) > label > input", { visible: true });

// Isi konfirmasi password
await metamaskPage.type("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > div:nth-child(2) > label > input", "password123", { delay: 100 });

console.log("✅ Konfirmasi password berhasil dimasukkan");

// Tunggu checkbox muncul
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > div.mm-box.mm-box--margin-top-4.mm-box--margin-bottom-4.mm-box--justify-content-space-between.mm-box--align-items-center > label > span.mm-checkbox__input-wrapper > input", { visible: true });

// Klik checkbox persetujuan
await metamaskPage.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > div.mm-box.mm-box--margin-top-4.mm-box--margin-bottom-4.mm-box--justify-content-space-between.mm-box--align-items-center > label > span.mm-checkbox__input-wrapper > input");

console.log("✅ Checkbox persetujuan dicentang");

// Tunggu tombol "Import Wallet" muncul
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > button", { visible: true });

// Klik tombol "Import Wallet"
await metamaskPage.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.mm-box--margin-top-3.mm-box--justify-content-center > form > button");


//klik tombol "Done"
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.creation-successful__actions.mm-box--margin-top-6.mm-box--display-flex.mm-box--flex-direction-column.mm-box--justify-content-center.mm-box--align-items-center > button");
await metamaskPage.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.creation-successful__actions.mm-box--margin-top-6.mm-box--display-flex.mm-box--flex-direction-column.mm-box--justify-content-center.mm-box--align-items-center > button");
console.log("✅ Klik Tombol Done Berhasil");

//klik tombol "Next"
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.onboarding-pin-extension__buttons > button");
await metamaskPage.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.onboarding-pin-extension__buttons > button");
console.log("✅ Klik Tombol Next Berhasil")

//klik tombol "Done"
await metamaskPage.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.onboarding-pin-extension__buttons > button");
await metamaskPage.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.onboarding-pin-extension__buttons > button");
console.log("✅ Klik Tombol Done Berhasil");



console.log("🎉 Wallet berhasil diimport ke MetaMask!");

    } else {
        console.log("❌ MetaMask tidak terbuka!");
    }

    // Setelah wallet diimport, buka Kaia Portal
    console.log("🌐 Membuka Kaia Portal...");
    const kaiaPage = await browser.newPage();
    await kaiaPage.goto("https://portal.kaia.io/mission/epoch2?ref=17955f9e", { waitUntil: "networkidle2" });

    console.log("✅ Halaman Kaia Portal terbuka");

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Klik tombol login di Kaia Portal
    await kaiaPage.waitForSelector("#root > div > div > div > div > main > div.sc-ignwuq.DzyMm > div > div.sc-KXCwU.sc-fVnuOT.bgsZUE.bMUraS > button > div.css-10mqw7g", { visible: true });
    await kaiaPage.click("#root > div > div > div > div > main > div.sc-ignwuq.DzyMm > div > div.sc-KXCwU.sc-fVnuOT.bgsZUE.bMUraS > button > div.css-10mqw7g");
    console.log("✅ Connect & Get Boost!");

    await new Promise(resolve => setTimeout(resolve, 3000));
    // Klik tombol MetaMask setelah login
    await kaiaPage.waitForSelector("body > div:nth-child(6) > div > div > div > div > div.sc-KXCwU.sc-fJoByQ.bgsZUE.dRcwzi > button:nth-child(3)", { visible: true });
    await kaiaPage.click("body > div:nth-child(6) > div > div > div > div > div.sc-KXCwU.sc-fJoByQ.bgsZUE.dRcwzi > button:nth-child(3)");
    console.log("✅ Klik Wallet Metamask");

    await new Promise(resolve => setTimeout(resolve, 3000)); // Jeda untuk pop-up muncul

async function handleMetaMaskPopupsWithWebInteraction(browser) {
    // Tunggu beberapa detik untuk memastikan halaman telah dimuat
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mencari halaman MetaMask pertama
    let metamaskPopupFirst = (await browser.pages()).find(p => p.url().includes("chrome-extension://") && p.url().includes("notification"));
    if (metamaskPopupFirst) {
        console.log("✅ MetaMask pop-up pertama ditemukan!");

        // Interaksi dengan pop-up pertama (klik tombol Connect)
        await metamaskPopupFirst.setViewport({ width: 350, height: 550 });

        await new Promise(resolve => setTimeout(resolve, 5000));
    await metamaskPopupFirst.waitForSelector("#app-content > div > div > div > div.mm-box.multichain-page.mm-box--display-flex.mm-box--flex-direction-row.mm-box--justify-content-center.mm-box--width-full.mm-box--height-full.mm-box--background-color-background-alternative > div > div.mm-box.multichain-page-footer.mm-box--padding-4.mm-box--display-flex.mm-box--gap-4.mm-box--width-full > div > div.mm-box.mm-box--display-flex.mm-box--gap-4.mm-box--width-full > button.mm-box.mm-text.mm-button-base.mm-button-base--size-lg.mm-button-base--block.mm-button-primary.mm-text--body-md-medium.mm-box--padding-0.mm-box--padding-right-4.mm-box--padding-left-4.mm-box--display-inline-flex.mm-box--justify-content-center.mm-box--align-items-center.mm-box--color-primary-inverse.mm-box--background-color-primary-default.mm-box--rounded-pill", { visible: true });
    await metamaskPopupFirst.click("#app-content > div > div > div > div.mm-box.multichain-page.mm-box--display-flex.mm-box--flex-direction-row.mm-box--justify-content-center.mm-box--width-full.mm-box--height-full.mm-box--background-color-background-alternative > div > div.mm-box.multichain-page-footer.mm-box--padding-4.mm-box--display-flex.mm-box--gap-4.mm-box--width-full > div > div.mm-box.mm-box--display-flex.mm-box--gap-4.mm-box--width-full > button.mm-box.mm-text.mm-button-base.mm-button-base--size-lg.mm-button-base--block.mm-button-primary.mm-text--body-md-medium.mm-box--padding-0.mm-box--padding-right-4.mm-box--padding-left-4.mm-box--display-inline-flex.mm-box--justify-content-center.mm-box--align-items-center.mm-box--color-primary-inverse.mm-box--background-color-primary-default.mm-box--rounded-pill");
    console.log("✅ Klik Connect");

    await new Promise(resolve => setTimeout(resolve, 2000));
   

    await metamaskPopupFirst.waitForSelector("#app-content > div > div > div > div.confirmation-footer > div.confirmation-footer__actions > button.button.btn--rounded.btn-primary", { visible: true });
    await metamaskPopupFirst.click("#app-content > div > div > div > div.confirmation-footer > div.confirmation-footer__actions > button.button.btn--rounded.btn-primary");
    console.log("✅ Klik tombol Aprove")

        // Tunggu pop-up pertama ditutup
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Sekarang kita beralih kembali ke halaman web
        console.log("🌐 Beralih kembali ke halaman web...");

        const pages = await browser.pages();
        const kaiaPageTab3 = pages[2]; // Ambil tab ketiga berdasarkan indeks
        if (kaiaPageTab3 && kaiaPageTab3.url().includes("portal.kaia.io/mission/epoch2")) {
            await kaiaPageTab3.bringToFront(); // Fokuskan kembali ke halaman Kaia Portal Tab 3
            console.log("✅ Kembali ke halaman Kaia Portal (Tab 3)");
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Melakukan interaksi dengan elemen halaman Kaia Portal setelah pop-up pertama ditangani
            await kaiaPageTab3.waitForSelector("body > div:nth-child(4) > div > div > div > div > div.sc-KXCwU.sc-krigPL.bgsZUE.hmYxRB > div.sc-KXCwU.sc-gbPVqi.bgsZUE.hlAkKE > div.sc-KXCwU.sc-gyycJP.bgsZUE.bMZsqw > div.css-1jrv9ue", { visible: true });
            await kaiaPageTab3.click("body > div:nth-child(4) > div > div > div > div > div.sc-KXCwU.sc-krigPL.bgsZUE.hmYxRB > div.sc-KXCwU.sc-gbPVqi.bgsZUE.hlAkKE > div.sc-KXCwU.sc-gyycJP.bgsZUE.bMZsqw > div.css-1jrv9ue"); // Gantilah dengan selector elemen yang sesuai
            console.log("✅ Melakukan Checkbox pada halaman Kaia Portal");
            await new Promise(resolve => setTimeout(resolve, 3000));

            await kaiaPageTab3.waitForSelector("body > div:nth-child(4) > div > div > div > div > div.sc-KXCwU.sc-krigPL.bgsZUE.hmYxRB > div.sc-KXCwU.sc-gbPVqi.bgsZUE.hlAkKE > div:nth-child(2) > button", { visible: true });
            await kaiaPageTab3.click("body > div:nth-child(4) > div > div > div > div > div.sc-KXCwU.sc-krigPL.bgsZUE.hmYxRB > div.sc-KXCwU.sc-gbPVqi.bgsZUE.hlAkKE > div:nth-child(2) > button"); // Gantilah dengan selector elemen yang sesuai
            console.log("✅ Melakukan Confirm pada halaman Kaia Portal");
            await new Promise(resolve => setTimeout(resolve, 3000));

        } else {
            console.log("❌ Tab Kaia Portal ketiga tidak ditemukan!");
        }
    } else {
        console.log("❌ Pop-up MetaMask pertama tidak ditemukan!");
    }


await new Promise(resolve => setTimeout(resolve, 2000)); // Waktu tunggu 5 detik
    // Mencari dan menangani pop-up MetaMask kedua
    const metamaskPopupSecond = (await browser.pages()).find(p => p.url().includes("chrome-extension://") && p.url().includes("notification"));
    if (metamaskPopupSecond) {
        console.log("✅ MetaMask pop-up kedua ditemukan!");

        // Interaksi dengan pop-up kedua
        await metamaskPopupSecond.setViewport({ width: 350, height: 550 });

        // Klik tombol Confirm atau lainnya
        await metamaskPopupSecond.waitForSelector("#app-content > div > div > div > div > div.mm-box.multichain-page-footer.confirm-footer_page-footer.mm-box--padding-4.mm-box--display-flex.mm-box--gap-4.mm-box--width-full > button.mm-box.mm-text.mm-button-base.mm-button-base--size-lg.mm-button-base--block.mm-button-primary.mm-text--body-md-medium.mm-box--padding-0.mm-box--padding-right-4.mm-box--padding-left-4.mm-box--display-inline-flex.mm-box--justify-content-center.mm-box--align-items-center.mm-box--color-primary-inverse.mm-box--background-color-primary-default.mm-box--rounded-pill", { visible: true });
        await metamaskPopupSecond.click("#app-content > div > div > div > div > div.mm-box.multichain-page-footer.confirm-footer_page-footer.mm-box--padding-4.mm-box--display-flex.mm-box--gap-4.mm-box--width-full > button.mm-box.mm-text.mm-button-base.mm-button-base--size-lg.mm-button-base--block.mm-button-primary.mm-text--body-md-medium.mm-box--padding-0.mm-box--padding-right-4.mm-box--padding-left-4.mm-box--display-inline-flex.mm-box--justify-content-center.mm-box--align-items-center.mm-box--color-primary-inverse.mm-box--background-color-primary-default.mm-box--rounded-pill");

        console.log("✅ Klik tombol pada pop-up kedua");

        // Tunggu beberapa detik agar pop-up kedua ditutup
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Kembali ke tab Kaia Portal yang benar (tab ketiga)
        const pages = await browser.pages();
        const kaiaPageTab3 = pages[2]; // Ambil tab ketiga berdasarkan indeks
        if (kaiaPageTab3 && kaiaPageTab3.url().includes("portal.kaia.io/mission/epoch2")) {
            await kaiaPageTab3.bringToFront(); // Fokuskan kembali ke halaman Kaia Portal Tab 3
            console.log("✅ Kembali ke halaman Kaia Portal (Tab 3) setelah pop-up kedua");

            // Melakukan interaksi dengan elemen halaman Kaia Portal setelah pop-up pertama ditangani
            await kaiaPageTab3.waitForSelector("#root > div > div > div > div > main > div.sc-ignwuq.DzyMm > div > div.sc-KXCwU.sc-fVnuOT.bgsZUE.bMUraS > button > div.css-10mqw7g", { visible: true });
            await kaiaPageTab3.click("#root > div > div > div > div > main > div.sc-ignwuq.DzyMm > div > div.sc-KXCwU.sc-fVnuOT.bgsZUE.bMUraS > button > div.css-10mqw7g#root > div > div > div > div > main > div.sc-ignwuq.DzyMm > div > div.sc-KXCwU.sc-fVnuOT.bgsZUE.bMUraS > button > div.css-10mqw7g"); // Gantilah dengan selector elemen yang sesuai
            console.log("✅ Melakukan login pada halaman Kaia Portal");

            await kaiaPageTab3.waitForSelector("body > div:nth-child(6) > div > div > div > div > div.sc-KXCwU.sc-fJoByQ.bgsZUE.dRcwzi > button:nth-child(3)", { visible: true });
            await kaiaPageTab3.click("body > div:nth-child(6) > div > div > div > div > div.sc-KXCwU.sc-fJoByQ.bgsZUE.dRcwzi > button:nth-child(3)"); // Gantilah dengan selector elemen yang sesuai
            console.log("✅ Melakukan metamask pada halaman Kaia Portal");

        } else {
            console.log("❌ Tab Kaia Portal kedua tidak ditemukan!");
        }
    } else {
        console.log("❌ Pop-up MetaMask kedua tidak ditemukan!");
    }
}

// Panggil fungsi untuk menangani pop-up MetaMask dua kali dengan interaksi di halaman Kaia
await handleMetaMaskPopupsWithWebInteraction(browser);


    // Close the browser
    //await browser.close();
})();
