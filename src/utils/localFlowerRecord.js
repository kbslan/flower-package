// 1. 从localStorage中获取存储的数据
function queryAll(key) {
  const recordsJson = localStorage.getItem(key)
  return recordsJson ? JSON.parse(recordsJson) : []
}

// 2. 将数据存储到localStorage中
function save(key, records) {
  const recordsJson = JSON.stringify(records)
  localStorage.setItem(key, recordsJson)
}

// 3. 添加新数据到localStorage末尾
function push(key, newRecord) {
  const records = queryAll(key)
  records.push(newRecord)
  save(key, records)
}

// 3. 添加新数据到localStorage首列
function unshift(key, newRecord) {
  const records = queryAll(key)
  records.unshift(newRecord)
  save(key, records)
}

// 4. 分页查询数据
function queryPage(key, pageNumber, pageSize) {
  const records = queryAll(key)
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageRecords = records.slice(startIndex, endIndex)
  return pageRecords
}
// 5. 数量查询
function count(key) {
  const records = queryAll(key)
  return records.length
}
// 6. 本地ID
function nextSeq(key) {
  const val = localStorage.getItem(key)
  let seq = Number(val)
  if (!seq) {
    seq = 1
  }
  localStorage.setItem(key, seq + 1)
  return seq
}

// 7. 清空
function clear(key) {
  localStorage.setItem(key, '')
}

const localStorageManager = {
  queryAll,
  queryPage,
  count,
  unshift,
  push,
  save,
  nextSeq,
  clear
}

export default localStorageManager
