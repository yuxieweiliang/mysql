export async function createTable(sql, table) {
  let data
  try{
    data = await client.query(sql);
  }catch(err) {
    data = client.query(table);
  }finally {
    return data
  }
}
