/**
 * Verify the Arc project is configured for enhance-styles
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {boolean} is valid
 */
function verify ({ arc, inventory }) {
  const hasShared = inventory.inv.shared?.src
  const hasConfig = arc['enhance-styles']?.length > 0

  if (!hasShared) {
    console.warn('  Enhance Styles: Architect shared must be enabled')
  }
  if (!hasConfig) {
    console.warn('  Enhance Styles: @enhance-styles config required')
  }

  return hasShared && hasConfig
}

module.exports = verify
