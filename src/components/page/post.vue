<template>
	<div class="pos">
		<el-row class="row">
			<el-col :span='7' class="pos-order" id="order-list">
				<el-tabs>
					<el-tab-pane label="点餐">
						<el-table :data="tableData">
							<el-table-column prop="goodsName" label="商品名称"></el-table-column>
							<el-table-column prop="count" label="数量"></el-table-column>
							<el-table-column prop="price" label="价格"></el-table-column>
							<el-table-column label="操作" fixed="right" width=100>
								<template v-slot:default="slotProps">
									<el-button type="text" size="small" @click="deletOrderList(slotProps.row)">删除</el-button>
									<el-button type="text" size="small" @click="addOrderList(slotProps.row)">喜加一</el-button>
								</template>
							</el-table-column>
						</el-table>
                <div class="totalDiv">
					数量:{{number}}		金额:{{sum}}
				</div>
					</el-tab-pane>

					<div class="btn">
						<el-button type="warning" class="" @click="checkOut()">挂单</el-button>
						<el-button type="danger" @click="deletAll()">删除</el-button>
						<el-button type="success">外卖</el-button>
					</div>

					<el-tab-pane label="挂单" >挂单</el-tab-pane>
					<el-tab-pane label="外卖">外卖</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span='17'>
				<div class="often-goods">
					<div class="title">热门商品</div>
					<div class="often-goods-list">
						<ul>
							<li v-for="item in oftenGoods" :key="item.goodsId" @click="addOrderList(item)">
								<span>{{item.goodsName}}</span>
								<span class="o-price">￥{{item.price}}元</span>
							</li>
						</ul>
					</div>
				</div>

				<div class="goods-type">
					<el-tabs>
						<el-tab-pane label="汉堡">
							<div>
								<ul class='cookList'>
									<li v-for="goods in type0Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img src="../../assets/10.jpg" width="100%"></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">￥{{goods.price}}元</span>
									</li>

								</ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="小食">
							小食
						</el-tab-pane>
						<el-tab-pane label="饮料">
							饮料
						</el-tab-pane>
						<el-tab-pane label="套餐">
							套餐
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: "post",
		data() {
			return {
				tableData:[],
				oftenGoods:"",
				type0Goods: [{
						goodsId: 1,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
						goodsName: '香辣鸡腿堡',
						price: 18
					}, {
						goodsId: 2,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
						goodsName: '田园鸡腿堡',
						price: 15
					}, {
						goodsId: 3,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
						goodsName: '和风汉堡',
						price: 15
					}, {
						goodsId: 4,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
						goodsName: '快乐全家桶',
						price: 80
					}, {
						goodsId: 5,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
						goodsName: '脆皮炸鸡腿',
						price: 10
					}, {
						goodsId: 6,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
						goodsName: '魔法鸡块',
						price: 20
					}, {
						goodsId: 7,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
						goodsName: '可乐大杯',
						price: 10
					}, {
						goodsId: 8,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
						goodsName: '雪顶咖啡',
						price: 18
					}, {
						goodsId: 9,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
						goodsName: '大块鸡米花',
						price: 15
					}, {
						goodsId: 20,
						goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
						goodsName: '香脆鸡柳',
						price: 17
					}

				],
			  number:0,
			   sum:0
			}
			
		},
		created(){
		 axios.get('http://127.0.0.1:3000/haha')
      .then(response=>{
         console.log(response);
         this.oftenGoods=response.data;
		 
      })
      .catch(error=>{
          console.log(error);
          
      })
		},
		methods:{
			addOrderList(goods)
			{
				this.number++;
				this.sum+=goods.price;
				//先是否存在与列表中
				let isHave = false;
				for(let i=0;i<this.tableData.length;i++)
				{
					if(this.tableData[i].goodsId==goods.goodsId)
					{
						isHave=true;
					}
				}
				
				if(isHave){
					let arr = this.tableData.filter(o=>o.goodsId==goods.goodsId);
					
					arr[0].count++;
					
				}else
				{
					let newGoods= {goodsId:goods.goodsId,goodsName:goods.goodsName,
					goodsId:goods.goodsId,price:goods.price,count:1};
					this.tableData.push(newGoods);
				}
				
			},
			deletOrderList(goods)
			{
				this.number--;
				this.sum-=goods.price;
			    let isHave = false;
			    
				
				for(let i=0;i<this.tableData.length;i++)
			    {
			    	if(this.tableData[i].goodsId==goods.goodsId)
			    	{
			    		if(this.tableData[i].count==1)
						{
							this.tableData.splice(i,1);
							console.log(this.tableData);
						}else
						{
							this.tableData[i].count--;
						}
			    	}
			    }
				
			},
			deletAll(){
				
				this.tableData=[];
				this.number=0;
				this.sum=0;
			},
			checkOut(){
				if(this.tableData.length==0)
				{
					this.$message({
						message:'不能空结账',
						type:'success'
					});
					return;
				}
				this.deletAll();
				this.$message({
					message:'结账成功',
					type:'faile'
				});
			}
			
		}
	}
</script>

<style scoped="scoped">
	.pos,
	.row {
		height: 100%;
		text-align: center;
	}

	.pos-order {
		background-color: orange;
		border-right: 1px solid black;
		height: 100%;
	}

	.btn {

		margin-top: 20px;
	}

	.title {
		height: 20px;
		border-bottom: 1px solid red;
		background-color: #20A0FF;
		padding: 10px;
		text-align: center;

	}

	.often-goods-list ul li {
		list-style: none;
		float: left;
		border: 1px solid #00FF00;
		padding: 10px;
		margin: 10px;
		background-color: white;
		width: 150px;
		height: 40px;
		line-height: 40px;
		border-radius: 5%;
	}

	.o-price {
		color: #0000FF;
	}

	.goods-type {
		clear: both;
	}

	.cookList li {
		list-style: none;
		width: 23%;
		border: 1px solid #E5E9F2;
		height: auot;
		overflow: hidden;
		background-color: #fff;
		padding: 2px;
		float: left;
		margin: 2px;

	}

	.cookList li span {

		display: block;
		float: left;
	}

	.foodImg {
		width: 40%;
	}

	.foodName {
		font-size: 18px;
		padding-left: 10px;
		color: brown;

	}

	.foodPrice {
		font-size: 16px;
		padding-left: 10px;
		padding-top: 10px;
	}
	.totalDiv
	{
		text-align: center;
		
	}
</style>
