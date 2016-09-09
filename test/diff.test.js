      status: 'modified',
      status: 'added',
      status: 'deleted',
      status: 'modified',
      hunks: [],
      status: 'added'
      status: 'modified',
      status: 'modified',
      status: 'modified',
      status: 'modified',
      status: 'modified',

exports.testMergeConflicts = function(test) {
  var str = `diff --cc modified-on-both.txt
index 5b7855c,1353022..0000000
--- modified-on-both.txt
+++ modified-on-both.txt
@@@ -1,1 -1,1 +1,7 @@@
++<<<<<<< HEAD
 +master modification
++||||||| merged common ancestors
++text
++=======
+ branch modification
++>>>>>>> branch
* Unmerged path removed-on-branch.txt
* Unmerged path removed-on-master.txt`

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      filePath: 'modified-on-both.txt',
      status: 'unmerged',
      hunks: [
        {
          ourStartLine: 1,
          ourLineCount: 1,
          baseStartLine: 1,
          baseLineCount: 1,
          theirStartLine: 1,
          theirLineCount: 7,
          lines: [
            '++<<<<<<< HEAD',
            ' +master modification',
            '++||||||| merged common ancestors',
            '++text',
            '++=======',
            '+ branch modification',
            '++>>>>>>> branch'
          ]
        }
      ]
    },
    {
      filePath: 'removed-on-branch.txt',
      status: 'unmerged'
    },
    {
      filePath: 'removed-on-master.txt',
      status: 'unmerged'
    }
  ])
  test.done()
}