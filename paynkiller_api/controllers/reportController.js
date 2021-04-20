const { asyncQuery, generateQueryBody } = require("../helpers/queryHelp");

module.exports = {
  getLaporanKeuanganByDate: async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
      let dateStart = new Date(startDate);
      let dateEnd = new Date(endDate);

      let startYear = dateStart.getFullYear();
      let endYear = dateEnd.getFullYear();
      let startMonth = dateStart.getMonth() + 1;
      let endMonth = dateEnd.getMonth() + 1;
      let startHari = dateStart.getDate();
      let endHari = dateEnd.getDate();

      let resultStartDate = `${startYear}-${startMonth}-${startHari} 00:00:00`;
      let resultEndDate = `${endYear}-${endMonth}-${endHari} 23:59:59`;

      let sql = `SELECT * FROM orders 
            WHERE id_status BETWEEN 3 AND 6 
            AND
            tanggal_bayar BETWEEN '${resultStartDate}' AND '${resultEndDate}'
            `;
      let rows = await asyncQuery(sql);

      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getLaporanKeuanganAll: async (req, res) => {
    try {
      let sql = `SELECT * FROM orders WHERE id_status BETWEEN 3 AND 6`;
      let rows = await asyncQuery(sql);

      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getJumlahProdukJualAll: async (req, res) => {
    try {
      let sql = `SELECT c.nama_produk,SUM(DISTINCT b.qty) AS TotalJual
            FROM orders a
            INNER JOIN order_details AS b ON a.order_number = b.order_number
            INNER JOIN produk AS c ON b.id_produk = c.id_produk
            WHERE a.id_status BETWEEN 3 AND 6
            GROUP BY nama_produk
            ORDER BY nama_produk ASC
            `;
      let rows = await asyncQuery(sql);

      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getJumlahProdukJualByDate: async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
      let dateStart = new Date(startDate);
      let dateEnd = new Date(endDate);

      let startYear = dateStart.getFullYear();
      let endYear = dateEnd.getFullYear();
      let startMonth = dateStart.getMonth() + 1;
      let endMonth = dateEnd.getMonth() + 1;
      let startHari = dateStart.getDate();
      let endHari = dateEnd.getDate();

      let resultStartDate = `${startYear}-${startMonth}-${startHari} 00:00:00`;
      let resultEndDate = `${endYear}-${endMonth}-${endHari} 23:59:59`;

      let sql = `SELECT c.nama_produk,SUM(DISTINCT b.qty) AS TotalJual
            FROM orders a
            INNER JOIN order_details AS b ON a.order_number = b.order_number
            INNER JOIN produk AS c ON b.id_produk = c.id_produk
            WHERE a.id_status BETWEEN 3 AND 6
            AND
            a.tanggal_bayar BETWEEN '${resultStartDate}' AND '${resultEndDate}'
            GROUP BY nama_produk
            ORDER BY nama_produk ASC`;
      let rows = await asyncQuery(sql);

      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getJumlahBahanBakuJualAll: async (req, res) => {
    try {
      let sql = `SELECT 
            d.nama_bahan_baku,SUM(DISTINCT c.total_beli_satuan) AS TotalJual 
            FROM orders a
            INNER JOIN order_details AS b ON a.order_number = b.order_number
            INNER JOIN custom_order_detail AS c ON b.id_custom_order = c.id_custom_order
            INNER JOIN bahan_baku AS d ON c.id_bahan_baku = d.id_bahan_baku
            WHERE a.id_status BETWEEN 3 AND 6
            GROUP BY nama_bahan_baku
            ORDER BY nama_bahan_baku ASC
             `;
      let rows = await asyncQuery(sql);

      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getJumlahBahanBakuJualByDate: async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
      let dateStart = new Date(startDate);
      let dateEnd = new Date(endDate);

      let startYear = dateStart.getFullYear();
      let endYear = dateEnd.getFullYear();
      let startMonth = dateStart.getMonth() + 1;
      let endMonth = dateEnd.getMonth() + 1;
      let startHari = dateStart.getDate();
      let endHari = dateEnd.getDate();

      let resultStartDate = `${startYear}-${startMonth}-${startHari} 00:00:00`;
      let resultEndDate = `${endYear}-${endMonth}-${endHari} 23:59:59`;

      let sql = `SELECT 
            d.nama_bahan_baku,SUM(DISTINCT c.total_beli_satuan) AS TotalJual 
            FROM orders a
            INNER JOIN order_details AS b ON a.order_number = b.order_number
            INNER JOIN custom_order_detail AS c ON b.id_custom_order = c.id_custom_order
            INNER JOIN bahan_baku AS d ON c.id_bahan_baku = d.id_bahan_baku
            WHERE a.id_status BETWEEN 3 AND 6
            AND
            a.tanggal_bayar BETWEEN '${resultStartDate}' AND '${resultEndDate}'
            GROUP BY nama_bahan_baku
            ORDER BY nama_bahan_baku ASC
             `;
      let rows = await asyncQuery(sql);

      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getTotalProfit: async (req, res) => {
    try {
      let sql = `SELECT SUM(DISTINCT grandTotal_checkout) AS profits FROM orders 
            WHERE id_status BETWEEN 3 AND 6`;
      let rows = await asyncQuery(sql);
      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getRacikanBestSeller: async (req, res) => {
    try {
      let sql = `SELECT t.nama_bahan_baku, MAX(t.TotalJual) 
            FROM (	    
                    SELECT 
                        d.nama_bahan_baku,SUM(DISTINCT c.total_beli_satuan) AS TotalJual 
                        FROM orders a
                        INNER JOIN order_details AS b ON a.order_number = b.order_number
                        INNER JOIN custom_order_detail AS c ON b.id_custom_order = c.id_custom_order
                        INNER JOIN bahan_baku AS d ON c.id_bahan_baku = d.id_bahan_baku
                        WHERE a.id_status BETWEEN 3 AND 6
                        GROUP BY nama_bahan_baku
                ) t`;
        let rows = await asyncQuery(sql)
        res.status(200).send(rows);


    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getProductBestSeller: async (req, res) => {
    try {
      let sql = `SELECT t.nama_produk,MAX(t.TotalJual) AS TotalMax
                        FROM(
                            SELECT c.nama_produk,SUM(DISTINCT b.qty) AS TotalJual
                            FROM orders a
                                    INNER JOIN order_details AS b ON a.order_number = b.order_number
                                    INNER JOIN produk AS c ON b.id_produk = c.id_produk
                                    WHERE a.id_status BETWEEN 3 AND 6
                                    GROUP BY c.nama_produk
                            ) t`;
      let rows = await asyncQuery(sql);
      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getnamaProdukBestSeller: async (req,res) => {
      try{
            let sql = `SELECT c.nama_produk AS productName,SUM(DISTINCT b.qty) AS TotalJual
            FROM orders a
                    INNER JOIN order_details AS b ON a.order_number = b.order_number
                    INNER JOIN produk AS c ON b.id_produk = c.id_produk
                    WHERE a.id_status BETWEEN 3 AND 6
                    GROUP BY c.nama_produk
                    ORDER BY TotalJual DESC`
            let rows = await asyncQuery(sql);
            res.status(200).send(rows[0]);


      }
      catch(err){
        console.log(err);
        res.status(400).send(err);
      }
  },
  getnamaBahanBakuBestSeller: async (req,res) => {
    try{
          let sql = `SELECT 
          d.nama_bahan_baku,SUM(DISTINCT c.total_beli_satuan) AS TotalJual 
          FROM orders a
          INNER JOIN order_details AS b ON a.order_number = b.order_number
          INNER JOIN custom_order_detail AS c ON b.id_custom_order = c.id_custom_order
          INNER JOIN bahan_baku AS d ON c.id_bahan_baku = d.id_bahan_baku
          WHERE a.id_status BETWEEN 3 AND 6
          GROUP BY nama_bahan_baku
          ORDER BY TotalJual DESC`
          let rows = await asyncQuery(sql);
          res.status(200).send(rows[0]);

    }
    catch(err){
      console.log(err);
      res.status(400).send(err);
    }
},
  
};
