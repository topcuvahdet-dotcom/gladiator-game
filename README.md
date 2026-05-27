# Gladiator Game 🎮⚔️

2D Gladiator oyunu - Phaser 3 ile yapılmış

## Özellikler

✅ Oyuncu kontrolü (Sol/Sağ ok tuşu, SPACE zıpla)
✅ Basit düşman AI
✅ Dövüş sistemi (Yukarı ok tuşu ile saldır)
✅ Sağlık sistemi
✅ Win/Lose mekaniği
✅ Responsive tasarım (mobil/PC/web)

## Kontroller

- **Sol/Sağ Ok Tuşu**: Hareket
- **SPACE**: Zıpla
- **Yukarı Ok Tuşu**: Saldır

## Kurulum

1. Repo'yu klonla:
```bash
git clone https://github.com/topcuvahdet-dotcom/gladiator-game.git
cd gladiator-game
```

2. Bağımlılıkları yükle:
```bash
npm install
```

3. Sunucuyu başlat:
```bash
npm start
```

4. Tarayıcıda aç:
```
http://localhost:8000
```

## Proje Yapısı

```
gladiator-game/
├── index.html              # Ana HTML dosyası
├── src/
│   ├── main.js             # Phaser konfigürasyonu
│   ├── scenes/
│   │   └── gameScene.js    # Ana oyun sahnesi
│   └── characters/
│       ├── player.js       # Oyuncu karakteri
│       └── enemy.js        # Düşman karakteri
├── package.json
└── README.md
```

## Gelecek Güncellemeler

- [ ] Sprite grafikleri
- [ ] Ses efektleri
- [ ] Multiple level'lar
- [ ] Power-up sistemi
- [ ] Combo sistem
- [ ] Leaderboard
- [ ] Mobil touch kontrolleri

## Lisans

MIT
