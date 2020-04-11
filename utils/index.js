const uitls = {
  genSidebar: function(title = '目录', children = [''], collapsable = true, sidebarDepth = 2) {
    return [{
      title,
      children,
      collapsable,
      sidebarDepth
    }]
  }
}

module.exports = uitls