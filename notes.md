# Notes

Link deploy: http://blog.arjunagbt.icu/


isi .env:

JWT_SECRET = inisecretyak
MONGODB_URL = mongodb://blogtiv8:q1w2e3r4@ds155653.mlab.com:55653/blogtiv8

### kendala: 

* karena masih pakai bootstrap jadi suka bingung layouting (akhirnya di kanban udah pakai vuetify)
* suka ragu kapan pakai views kapan pakai components, dan kapan components itu ditaruh di children di routes
* nyobain pakai certbot buat https:// tapi gabisa karena unauthorized, nyobain pakai cloudflare kelamaan, akhirnya deploy tetep di GCS bucket
* niatnya mau ada profpic buat tiap user (makanya di dashboard ada placeholder), tapi bingung TDDnya gimana buat bikin req.file nya
* TDD untuk kasus default .catch(error => {}), kan di res.status(500).json, tapi ngebikin kasus error biar masuk ke catch itu di testing nggak ngerti gimana. jadinya di istanbul terutama yang article dan comment coveragenya masih 70%an
