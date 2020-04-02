const {
  web
} = require('@/core/_databases')

async function getAll(id) {
  const items = await web.query(  `
SELECT
  item.title AS item_title, item.href AS item_href,
  sub.title AS sub_title, sub.href AS sub_href,
  position, sub.\`order\` AS sub_index
FROM
  catalog_item_table AS item
  LEFT JOIN sub_catalog_table AS sub ON item.sub_catalog_ID=sub.ID
ORDER BY
  sub.\`position\` ASC, item.\`order\` ASC
  `
  )
  return items
}

module.exports = {
  getAll
}