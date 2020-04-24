SET NAMES UTF8;
DROP DATABASE IF EXISTS dior;
CREATE DATABASE dior CHARSET=UTF8;
USE dior;

/**购物车条目**/
CREATE TABLE dior_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);

/*用户列表*/
#创建保存用户的表
CREATE TABLE dior_user(
  uid INT PRIMARY KEY AUTO_INCREMENT ,
  uname VARCHAR(8),
  birthday DATE,
  upwd VARCHAR(32),
  email VARCHAR(16),
  phone VARCHAR(11),
  gender INT,#0-女  1-男
  user_name VARCHAR(8)#真实姓名
  
);
/*用户地址表*/
CREATE TABLE dior_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,#编号
  user_id INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机号码
  fixedphone VARCHAR(16),     #固定电话
  postcode VARCHAR(6),        #邮编
  tag VARCHAR(16),            #标签名
  is_default BOOLEAN          #是否为当前用户的默认收货地址

);
/** dior商品表 **/
CREATE TABLE dior_commodity(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,      #主标题
  subtitle VARCHAR(128)NOT NULL,    #副标题
  price DECIMAL(7,2)NOT NULL,       #价格
  promise VARCHAR(64)NOT NULL,      #服务承诺
  spec VARCHAR(64) NOT NULL,        #规格/色号
  details VARCHAR(1024)NOT NULL,    #产品详细说明
  shelf_time DATE NOT NULL,         #上架时间
  sold_count INT DEFAULT 0,         #已售出的数量
  is_onsale BOOLEAN DEFAULT 1       #是否促销中
);
/**dior商品类型**/
CREATE TABLE dior_commodity_type(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);
#商品图片表
CREATE TABLE dior_makeup_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  makeup_id INT,              #笔记本电脑编号
  sm VARCHAR(128),            #小图片路径
  md VARCHAR(128),            #中图片路径
  lg VARCHAR(128)             #大图片路径
);

#插入用户列表数据
INSERT INTO dior_user VALUES(1,'dingding','1999-2-1','123123123','dingding@qq.com','11111111111',0,'丁丁');
INSERT INTO dior_user VALUES(2,'mike','1998-3-1','234234234','mike@qq.com','22222222222',1,'尼克');
INSERT INTO dior_user VALUES(3,'luxi','1995-4-2','345345345','luxi@qq.com','33333333333',0,'露西');
INSERT INTO dior_user VALUES(4,'xixi','2000-9-7','567567567','xixi@qq.com','444444444444',0,'嘻嘻');
INSERT INTO dior_user VALUES(5,'root','1998-12-2','678678678','root@qq.com','55555555555',1,'鲁特');
INSERT INTO dior_user VALUES(6,'hello','2000-7-8','789789789','hello@qq.com','66666666666',1,'哈喽');

/**dior商品类型添加数据**/
INSERT INTO dior_commodity_type VALUES
(NULL,'DIOR迪奥烈艳蓝金唇膏'),
(NULL,'烈艳蓝金「红管」液唇膏'),
(NULL,'全新DIOR迪奥烈艳蓝金挚红唇膏'),
(NULL,'DIOR迪奥烈艳蓝金唇膏'),
(NULL,'DIOR迪奥唇膏'),
(NULL,'DIOR迪奥魅惑染唇蜜'),
(NULL,'DIOR迪奥变色唇膏'),
(NULL,'DIOR迪奥烈红唇膏'),
(NULL,'DIOR迪奥魅惑釉唇膏');

/** dior商品表添加数据 **/
INSERT INTO dior_commodity VALUES
(1,'DIOR迪奥烈艳蓝金唇膏','高订色泽 – 缎光或哑光妆效 – 舒悦持色',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','迪奥999','高订色彩，缎光妆效，Dior迪奥烈艳蓝金唇膏持色舒适配方，为女性带来美妙的享受。
经典红色系、热烈珊瑚红、热情欢乐的粉色系、浪漫迷人的紫红，以及一系列前卫色彩，呈献唇妆惊喜。
这款唇膏暗藏玄机的迪奥全新金属外壳具有非凡吸引力：为了彰显一抹个性奢华魅力，唇膏盖内皆以Dior迪奥的经典迷人色彩——#传奇红唇（#999）的色彩装点。','2019-9-24',520,true),
(2,'烈艳蓝金「红管」液唇膏*','花萃润护 花漾色泽 一抹绽放柔雾花瓣唇',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','999盛放','DIOR迪奥首款融蕴花卉精油的液唇膏，花萃润护，轻盈持色。 灵感源自品牌挚爱的花卉，花漾色泽，打造柔雾哑光、晨露缎光花瓣唇。 精巧花瓣柔绒唇刷，精准勾勒双唇。
*产品名为克丽丝汀迪奥烈艳蓝金挚红液体唇膏','2019-8-3',300,true),
(3,'全新DIOR迪奥烈艳蓝金挚红唇膏','炽色 持妆 轻盈水润',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','999ULTra dior','DIOR迪奥创新美妍配方，打造兼具染唇妆效的炽色持妆唇膏。
浓郁显色而轻盈舒适，呈现半哑光柔润唇，持妆12小时*。
DIOR迪奥美妍科学工艺突破，烈艳蓝金挚红唇膏实现了迷人的明媚色彩与舒润妆感的美妙结合。
潜心专研，12小时*炽色持妆，轻盈水润。
*针对20名女性，经照片分析得出的结果，效果因人而异','2019-4-8',120,true),
(4,'DIOR迪奥烈艳蓝金唇膏','高订色泽 – 缎光或哑光妆效 – 舒悦持色',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','666dior','全新Dior迪奥魅惑釉唇膏，Dior迪奥首款“固体唇釉”，兼具液态唇釉的浓郁漆光亮泽，与固态唇膏舒适润唇感受。质地顺滑易涂，轻盈持妆。
“我希望打造一款唇妆产品，既舒适润唇，同时又浓郁显色。全新Dior迪奥魅惑釉唇膏就兼融了这两点。”
Dior迪奥彩妆创意与形象总监彼得·菲利普（Peter Philips）','2019-3-6',100,true),
(5,'DIOR迪奥唇膏','焕现自然唇色',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','变色唇釉','Dior迪奥后台彩妆必备，原有盈亮妆效，新增两种全新妆效：哑光、炫彩。迪奥推出的品牌首个变色唇膏*，灵感源自Dior迪奥后台专业级彩妆技艺，质地舒悦，为双唇量身定制自然粉漾色泽。
*产品注册名:克丽丝汀迪奥魅惑润唇膏','2019-2-6',230,true),
(6,'DIOR迪奥魅惑染唇蜜','着色彩染，持久轻盈裸唇感
aria_selectAColor',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','351魅惑染唇蜜','Dior迪奥首款染唇蜜，着色彩染，颠覆你的美妆习惯。
舒悦质地，带来轻盈裸唇感，轻轻一抹，瞬息着色，缤纷色调彩染双唇，亲亲不掉色。','2020-3-6',88,true),
(7,'DIOR迪奥变色唇膏','焕现自然唇色',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','变色唇釉','Dior迪奥后台彩妆必备，原有盈亮妆效，新增两种全新妆效：哑光、炫彩。迪奥推出的品牌首个变色唇膏*，灵感源自Dior迪奥后台专业级彩妆技艺，质地舒悦，为双唇量身定制自然粉漾色泽。
*产品注册名:DIOR迪奥变色唇膏','2018-3-6',230,true),
(8,'DIOR迪奥烈红唇膏','热烈珊瑚红',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','变色唇釉','Dior迪奥后台彩妆必备，原有盈亮妆效，新增两种全新妆效：哑光、炫彩。
*产品注册名:DIOR迪奥变色唇膏','2018-6-6',190,true),
(9,'DIOR迪奥魅惑釉唇膏','浓郁漆光，轻盈持妆',330.00,'7天无理由退货,非定制商品订单自签收日起7天内可享无理由退货','877给我迪奥','全新Dior迪奥魅惑釉唇膏，Dior迪奥首款“固体唇釉”，兼具液态唇釉的浓郁漆光亮泽，与固态唇膏舒适润唇感受。质地顺滑易涂，轻盈持妆。
“我希望打造一款唇妆产品，既舒适润唇，同时又浓郁显色。全新Dior迪奥魅惑釉唇膏就兼融了这两点。”','220-4-20',188,true);

#插入数据商品图片表
INSERT INTO dior_makeup_pic VALUES
(NULL, 1, 'img/product/sm/horizon%2Fcovers%2FY0028808_F002880877_E01_GHC.jpg','img/product/md/horizon%2Fcovers%2FY0028808_F002880877_E01_GHC.jpg','img/product/lg/2FY0028808_F002880877_E01_ZHC.jpg'),
(NULL, 2, 'img/product/sm/2FY0027830_F042783999_E01_GHC.jpg','img/product/md/2FY0027830_F042783999_E01_GHC.jpg','img/product/lg/1.jpg'),
(NULL, 3, 'img/product/sm/%2FY0112000%2FY0112000_C011200066_E01_GHC.jpg','img/product/md/C011200066_E01_GHC.jpg','img/product/lg/%2FY0112000%2FY0112000_C011200066_E01_ZHC.jpg')

