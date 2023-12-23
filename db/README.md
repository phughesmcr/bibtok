# Data Sources and Acknowledgements

## bible.db & book_info.json

The SQLite3 database file `bible.db` is a Deno.Kv (a key-value pair database from Deno) version of the
[Scrollmapper "Bible Versions and Cross-Reference Databases"](https://github.com/scrollmapper/bible_databases) which is
shared under the terms of the [GNU General Public License v3.0](http://www.gnu.org/licenses/). That database includes
the [OpenBible.info Cross-References database](http://www.openbible.info/labs/cross-references/), itself shared under
the [CC BY 4.0 DEED](https://creativecommons.org/licenses/by/4.0/) license. This `bible.db` database is shared under the
same terms as the original database. The `book_info.json` file is a JSON version of the `book_info` table in the
`bible.db` database.

It contains the following tables, where [id] is an integer in the format BBCCCVVV (see Scrollmapper):

- translations
  - ## asv
  - ## bbe
  - ## kjv
  - ## web
- books
  - BookInfo (see `db.ts`)
- crossrefs
  - [id]: `number[]` array of verse ids

## pericopes.json

The `pericopes.json` file is a JSON version of the file `2450.Pericopes.xls` from
[the OP on this forum thread](https://community.logos.com/forums/t/70978.aspx) created by user "Robert M. Warren"
Posted: Sun, Jun 2 2013 8:04 AM. No license is specified.
