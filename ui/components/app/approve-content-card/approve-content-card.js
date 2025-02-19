import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '../../ui/box/box';
import Button from '../../ui/button';
import EditGasFeeButton from '../edit-gas-fee-button/edit-gas-fee-button';
import Typography from '../../ui/typography/typography';
import {
  AlignItems,
  BLOCK_SIZES,
  DISPLAY,
  FLEX_DIRECTION,
  FONT_WEIGHT,
  JustifyContent,
  TEXT_ALIGN,
  TextColor,
  TypographyVariant,
} from '../../../helpers/constants/design-system';
import { I18nContext } from '../../../contexts/i18n';
import GasDetailsItem from '../gas-details-item/gas-details-item';
import MultiLayerFeeMessage from '../multilayer-fee-message/multi-layer-fee-message';
import { formatCurrency } from '../../../helpers/utils/confirm-tx.util';

export default function ApproveContentCard({
  showHeader = true,
  symbol,
  title,
  showEdit,
  showAdvanceGasFeeOptions = false,
  onEditClick,
  footer,
  noBorder,
  supportsEIP1559,
  renderTransactionDetailsContent,
  renderDataContent,
  isMultiLayerFeeNetwork,
  ethTransactionTotal,
  nativeCurrency,
  fullTxData,
  hexTransactionTotal,
  fiatTransactionTotal,
  currentCurrency,
  isSetApproveForAll,
  isApprovalOrRejection,
  data,
  userAcknowledgedGasMissing,
  renderSimulationFailureWarning,
  useCurrencyRateCheck,
}) {
  const t = useContext(I18nContext);

  return (
    <Box
      className={classnames({
        'approve-content-card-container__card': !noBorder,
        'approve-content-card-container__card--no-border': noBorder,
      })}
    >
      {showHeader && (
        <Box
          display={DISPLAY.FLEX}
          flexDirection={FLEX_DIRECTION.ROW}
          alignItems={AlignItems.center}
          justifyContent={JustifyContent.flexEnd}
          className="approve-content-card-container__card-header"
        >
          {supportsEIP1559 && title === t('transactionFee') ? null : (
            <>
              <Box className="approve-content-card-container__card-header__symbol">
                {symbol}
              </Box>
              <Box
                marginLeft={4}
                className="approve-content-card-container__card-header__title"
              >
                <Typography
                  variant={TypographyVariant.H6}
                  fontWeight={FONT_WEIGHT.BOLD}
                >
                  {title}
                </Typography>
              </Box>
            </>
          )}
          {showEdit && (!showAdvanceGasFeeOptions || !supportsEIP1559) && (
            <Box width={BLOCK_SIZES.ONE_SIXTH}>
              <Button type="link" onClick={() => onEditClick()}>
                <Typography
                  variant={TypographyVariant.H7}
                  color={TextColor.primaryDefault}
                >
                  {t('edit')}
                </Typography>
              </Button>
            </Box>
          )}
          {showEdit &&
            showAdvanceGasFeeOptions &&
            supportsEIP1559 &&
            !renderSimulationFailureWarning && (
              <EditGasFeeButton
                userAcknowledgedGasMissing={userAcknowledgedGasMissing}
              />
            )}
        </Box>
      )}
      <Box
        marginTop={1}
        marginBottom={3}
        className="approve-content-card-container__card-content"
      >
        {renderTransactionDetailsContent &&
          (!isMultiLayerFeeNetwork &&
          supportsEIP1559 &&
          !renderSimulationFailureWarning ? (
            <GasDetailsItem
              userAcknowledgedGasMissing={userAcknowledgedGasMissing}
            />
          ) : (
            <Box
              display={DISPLAY.FLEX}
              flexDirection={FLEX_DIRECTION.ROW}
              justifyContent={JustifyContent.spaceBetween}
            >
              {isMultiLayerFeeNetwork ? (
                <Box
                  display={DISPLAY.FLEX}
                  flexDirection={FLEX_DIRECTION.COLUMN}
                  className="approve-content-card-container__transaction-details-extra-content"
                >
                  <Box
                    display={DISPLAY.FLEX}
                    justifyContent={JustifyContent.spaceBetween}
                  >
                    <Typography
                      variant={TypographyVariant.H6}
                      fontWeight={FONT_WEIGHT.NORMAL}
                      color={TextColor.textMuted}
                    >
                      <span>{t('transactionDetailLayer2GasHeading')}</span>
                      {`${ethTransactionTotal} ${nativeCurrency}`}
                    </Typography>
                  </Box>
                  <MultiLayerFeeMessage
                    transaction={fullTxData}
                    layer2fee={hexTransactionTotal}
                    nativeCurrency={nativeCurrency}
                    plainStyle
                  />
                </Box>
              ) : (
                <>
                  <Box>
                    <Typography
                      variant={TypographyVariant.H7}
                      color={TextColor.textAlternative}
                    >
                      {t('feeAssociatedRequest')}
                    </Typography>
                  </Box>
                  <Box
                    display={DISPLAY.FLEX}
                    flexDirection={FLEX_DIRECTION.COLUMN}
                    alignItems={AlignItems.flexEnd}
                    textAlign={TEXT_ALIGN.RIGHT}
                  >
                    {useCurrencyRateCheck && (
                      <Box>
                        <Typography
                          variant={TypographyVariant.H4}
                          fontWeight={FONT_WEIGHT.BOLD}
                          color={TextColor.TEXT_DEFAULT}
                        >
                          {formatCurrency(
                            fiatTransactionTotal,
                            currentCurrency,
                          )}
                        </Typography>
                      </Box>
                    )}
                    <Box>
                      <Typography
                        variant={TypographyVariant.H6}
                        fontWeight={FONT_WEIGHT.NORMAL}
                        color={TextColor.textMuted}
                      >
                        {`${ethTransactionTotal} ${nativeCurrency}`}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          ))}
        {renderDataContent && (
          <Box display={DISPLAY.FLEX} flexDirection={FLEX_DIRECTION.COLUMN}>
            <Box>
              <Typography
                variant={TypographyVariant.H7}
                color={TextColor.textAlternative}
              >
                {isSetApproveForAll
                  ? t('functionSetApprovalForAll')
                  : t('functionApprove')}
              </Typography>
            </Box>
            {isSetApproveForAll && isApprovalOrRejection !== undefined ? (
              <Box>
                <Typography
                  variant={TypographyVariant.H7}
                  color={TextColor.textAlternative}
                >
                  {`${t('parameters')}: ${isApprovalOrRejection}`}
                </Typography>
              </Box>
            ) : null}
            <Box
              marginRight={4}
              className="approve-content-card-container__data__data-block"
            >
              <Typography
                variant={TypographyVariant.H7}
                color={TextColor.textAlternative}
              >
                {data}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {footer}
    </Box>
  );
}

ApproveContentCard.propTypes = {
  /**
   * Whether to show header including icon, transaction fee text and edit button
   */
  showHeader: PropTypes.bool,
  /**
   * Symbol icon
   */
  symbol: PropTypes.node,
  /**
   * Title to be included in the header
   */
  title: PropTypes.string,
  /**
   * Whether to show edit button or not
   */
  showEdit: PropTypes.bool,
  /**
   * Whether to show advanced gas fee options or not
   */
  showAdvanceGasFeeOptions: PropTypes.bool,
  /**
   * Should open customize gas modal when edit button is clicked
   */
  onEditClick: PropTypes.func,
  /**
   * Footer to be shown
   */
  footer: PropTypes.node,
  /**
   * Whether to include border-bottom or not
   */
  noBorder: PropTypes.bool,
  /**
   * Is enhanced gas fee enabled or not
   */
  supportsEIP1559: PropTypes.bool,
  /**
   * Whether to render transaction details content or not
   */
  renderTransactionDetailsContent: PropTypes.bool,
  /**
   * Whether to render data content or not
   */
  renderDataContent: PropTypes.bool,
  /**
   * Is multi-layer fee network or not
   */
  isMultiLayerFeeNetwork: PropTypes.bool,
  /**
   * Total sum of the transaction in native currency
   */
  ethTransactionTotal: PropTypes.string,
  /**
   * Current native currency
   */
  nativeCurrency: PropTypes.string,
  /**
   * Current transaction
   */
  fullTxData: PropTypes.object,
  /**
   * Total sum of the transaction converted to hex value
   */
  hexTransactionTotal: PropTypes.string,
  /**
   * Total sum of the transaction in fiat currency
   */
  fiatTransactionTotal: PropTypes.string,
  /**
   * Current fiat currency
   */
  currentCurrency: PropTypes.string,
  /**
   * Is set approve for all or not
   */
  isSetApproveForAll: PropTypes.bool,
  /**
   * Whether a current set approval for all transaction will approve or revoke access
   */
  isApprovalOrRejection: PropTypes.bool,
  /**
   * Current transaction data
   */
  data: PropTypes.string,
  /**
   * User acknowledge gas is missing or not
   */
  userAcknowledgedGasMissing: PropTypes.bool,
  /**
   * Render simulation failure warning
   */
  renderSimulationFailureWarning: PropTypes.bool,
  /**
   * Fiat conversion control
   */
  useCurrencyRateCheck: PropTypes.bool,
};
