export class Graduate{
    public Delete(cid: string){
        let sql =  `DELETE FROM graduate_data WHERE cid = '${cid}'`
        return sql
    }
    public getGraduateDataByCID(cid: string){
        let sql =  `SELECT * FROM graduate_data WHERE cid = '${cid}'`
        return sql
    }

    public getGraduateDataAll(){
        let sql =  `SELECT *, CONCAT(informant_pname,informant_fname,' ',informant_lname) fullname, 
                        CONCAT(created_date, '') createdDate, 
                        "true" as actions 
                    FROM graduate_data 
                        ORDER BY created_date DESC`
        return sql
    }
    public InsertData(objData: object) {
        let data = objData
        let keyField = Object.keys(data)
        let field = ""
        let values = ""
        let no = 1
        keyField.forEach((val) => {
            if (no !== 1) {
                field += ", "
            }
            field += val
            no++
        });
        for (let keys in data) {
            if (data.hasOwnProperty(keys)) {
                let value = data[keys];
                values += "'" + value + "', "
            }
        }
        let sql = `INSERT INTO graduate_data(${field}, created_date) VALUES(${values} NOW());`;

        return sql
    }

    public UadateData(objData: object, condition: string) {
        let data = objData
        let keyField = Object.keys(data)
        let field = ""
        // let values = ""
        let no = 1
        keyField.forEach((val) => {
            if (no !== 1) {
                field += ", "
            }
            field += val + " ='"+data[val]+"'"
            no++
        });
        let sql = `UPDATE graduate_data SET ${field} WHERE ${condition}`;

        return sql
    }
}