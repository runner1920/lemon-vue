import billBg from '@img/billInfo.jpg';
import calc from '@/utils/calc';

function createBillInfo(frontBillInfo, flag = 1) {
  return new Promise((resolve, reject) => {
    try {
      const c = document.createElement('canvas');
      c.width = '1200';
      c.height = '800';
      const ctx = c.getContext('2d');
      const copyData = calc.objDeepCopy(frontBillInfo);
      console.log('copyData', copyData);
      const billMoney = calc.accDivCoupon(copyData.billMoney, 100);
      if (flag === 2) {
        // 如果是大厅进入
        copyData.billNo = calc.subStr(
          copyData.billNo,
          copyData.billNo.length - 8,
          0,
          '********'
        );
        copyData.remitterName = '**********';
        copyData.remitterAcct = '**********';
        copyData.payeeName = '**********';
        copyData.payeeAcct = '**********';
      }
      copyData.billMoneyFormat = `￥${billMoney}`;
      copyData.DX = calc.toChinese(billMoney);
      copyData.cessionFlagFormat =
        copyData.cessionFlag === '0' ? '可转让' : '不可转让';
      copyData.billNoFormat = calc.insertStr(copyData.billNo, [1, 14, 23, 32]);
      const img = new Image();
      img.src = billBg;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1200, 800);
        ctx.font = 'bold 16px Microsoft YaHei';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = '#505E6D';
        ctx.fillText(copyData.acptDt, 143, 100);
        ctx.fillText(copyData.dueDt, 143, 138);
        ctx.fillText(copyData.status, 663, 100);
        ctx.fillText(copyData.billNoFormat, 663, 138);
        ctx.fillText(copyData.remitterName, 196, 180);
        ctx.fillText(copyData.remitterAcct, 196, 218);
        ctx.fillText(copyData.remitterOpenBankName, 196, 256);
        ctx.fillText(copyData.payeeName, 743, 180);
        ctx.fillText(copyData.payeeAcct, 743, 218);
        ctx.fillText(copyData.payeeOpenBankName, 743, 256);
        ctx.fillText(copyData.remitterAssurerName, 300, 294);
        ctx.fillText(copyData.remitterAssurerAddr, 582, 294);
        ctx.fillText(copyData.remitterAssurerDate, 1051, 294);
        ctx.fillText(copyData.billMoneyFormat, 743, 343);
        ctx.fillText(copyData.acceptorName, 281, 388);
        ctx.fillText(copyData.acceptorAcct, 281, 428);
        ctx.fillText(copyData.acceptorOpenBankNo, 743, 388);
        ctx.fillText(copyData.acceptorOpenBankName, 743, 428);
        ctx.fillText(copyData.contractNo, 196, 466);
        ctx.fillText(copyData.cessionFlagFormat, 196, 529);
        ctx.fillText(copyData.acceptDate, 1051, 544);
        ctx.fillText(copyData.acceptorAssurerName, 300, 588);
        ctx.fillText(copyData.acceptorAssurerAddr, 582, 588);
        ctx.fillText(copyData.acceptorAssurerDate, 1051, 588);
        ctx.fillText(copyData.remitterAppraiser, 369, 634);
        ctx.fillText(copyData.remitterCreditLevel, 742, 634);
        ctx.fillText(copyData.remitterCreditLevelOverdue, 1051, 634);
        ctx.fillText(copyData.acceptorAppraiser, 369, 688);
        ctx.fillText(copyData.acceptorCreditLevel, 742, 688);
        ctx.fillText(copyData.acceptorCreditLevelOverdue, 1051, 688);
        ctx.fillText(copyData.remark, 196, 735);
        ctx.fillText(copyData.DX, 327, 343);
        resolve(c.toDataURL('image/png', 0.1));
      };
    } catch (err) {
      reject(err.message);
    }
  });
}

export default createBillInfo;
