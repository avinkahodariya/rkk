import { View, Text } from 'react-native'
import React from 'react'

const ToolsScreen = () => {
  return (
    <View>
      <Text>ToolsScreen</Text>
    </View>
  )
}

export default ToolsScreen;

// <template>
{/* <tr data-uid="position.3677697.CNC0" class="">
<td class="select">
    <div class="su-checkbox-group">
        <input
            id="position.3677697.CNC0"
            type="checkbox"
            class="su-checkbox"
        />
        <label for="position.3677697.CNC0" class="su-checkbox-label">
            <span class="su-checkbox-box">
                <span class="su-checkbox-tick"></span>
            </span>
        </label>
    </div>
</td>
<td :class="position.closing_price ? 'closed greyed' : 'open'" class="product">
    <span class="text-label small aqua sienna-brown">
        {{ position.type }}
    </span>
</td>
<td
    :class="position.closing_price ? 'closed greyed' : 'open'"
    class="instrument"
    @mouseover="showOptions = true"
    @mouseleave="showOptions = false"
>
    <span v-if="stock.is_weekly" class="tradingsymbol"
        >{{ stock.name.split("w")[0]
        }}<sup><span class="weekly">w</span></sup>
        {{ stock.name.split("w")[1] }}</span
    >
    <span v-else class="tradingsymbol">{{ stock.name }}</span>

    <span class="exchange text-xxsmall dim" style="margin-left: 2px"
        >{{position.market_type.name}}</span
    >
    <span v-if="position.type !== 'MIS'" class="holding-tag text-label text-label-outline"
        ><a
            href="https://support.zerodha.com/category/trading-and-markets/kite-web-and-mobile/articles/purchase-of-stocks-for-delivery"
            target="_blank"
            data-balloon="Stock will show under Holdings tomorrow"
            data-balloon-pos="up"
            data-balloon-length="large"
            >HOLDING</a
        >
        <!----></span
    >
    <div
        v-if="showOptions"
        id="context-menu-141"
        class="context-menu table fade-leave fade-leave-active"
    >
        <div class="context-menu-button-wrap">
            <span
                class="context-menu-button"
                data-balloon="Options"
                data-balloon-pos="up"
                ><span class="icon icon-ellipsis"></span
            ></span>
        </div>
        <!---->
    </div>
    <!---->
</td>
<td :class="position.closing_price ? 'closed greyed' : 'open'" class="text-buy quantity right">
    {{ position.closing_price ? "0" : position.qty }}
</td>
<td :class="position.closing_price ? 'closed greyed' : 'open'" class="average-price right">
    {{ position.closing_price ? "0.00" : position.avg }}
</td>
<td :class="position.closing_price ? 'closed greyed' : 'open'" class="last-price right">
    {{ parseFloat(stock.current).toFixed(2) }}
</td>
<td :class="classR" class="pnl right">
    <span>{{ formattedChangeAmount }}</span>
</td>
<td :class="classR" class="change-percent change-percent right">
    <span>{{ changePercentage.toFixed(2) }}%</span>
</td>
</tr>
</template>

<script>
export default {
props: {
stock: Object,
position: Object,
changeAmount:String
},
data() {
return {
    showOptions: false,
};
},
methods: {
formatPrice(amount) {
    let formatter = new Intl.NumberFormat("en-IN", {
        style: "decimal",
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
},
},
computed: {
formattedChangeAmount() {
    let formattedPrice = this.formatPrice(parseFloat(this.changeAmount).toFixed(2));
    // console.log(formattedPrice);
    if (this.changeAmount > 0) {
        return `+${formattedPrice}`;
    }
    return formattedPrice;
},
changePercentage() {
    if (this.position.closing_price) {
        return 0.0;
    }
    let initialCapital =  this.position.qty * this.position.avg;

    return this.changeAmount / initialCapital * 100;
},
classR() {
    if (this.position.closing_price) {
        return "closed greyed";
    }

    if (this.changePercentage === 0) {
        return "open";
    }
    return this.changePercentage > 0
        ? `open text-green`
        : `open text-red`;
},
},
};
</script>

<style></style> */}