const stats = new window.Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
stats.dom.id = 'stats'

module.exports = stats
