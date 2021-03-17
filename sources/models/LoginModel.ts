export class Login{
    public getUser(user: string, pwd: string){
        let sql = `SELECT * FROM tb_users 
                    WHERE user_name = '${user}' AND pwd_web = '${pwd}' LIMIT 1`
        return sql
    }
}
