(function() {
	'use strict';

	angular
		.module('configurator')
		.component('selectModel', {
			templateUrl: './app/components/select-model/selectmodel.html',
			controller: SelectModelCtrl,
			require: {
				parent: '^app'
			}
		});

	SelectModelCtrl.$inject = [];

	function SelectModelCtrl() {
		var ctrl = this;

		ctrl.models = [{
			name: "Edition",
			description: "Some description",
			imgUrl: "https://r-media.volkswagen.com/Render/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7Az6yyJ1vTvsd2MZppEKhjTtKSK8Cbl1MM8H2Lvyr0Q%25UOVggAa5hP4KYwqeQeOOnD7yyJ8H3WDZ4HvCJii8Htw3oo0gZrnZlO4O6bLKKFNMbTggAcEvvFHOu5ZxxHlZkPF%25uAnW07ZZU8pVfRD%25xIIrsJYUP01bCCtBvyrm3xLLyH0kYbAwh88WTU9j%25I4bBMdPAA2Zjeqz5qMZKMI7UbSK8C7g1Qbl6xDAOtN3xjOrr9UOXs3WEMttO6Nf55Pu7h99de2QZZsEnCiiIv3RffQDc722U4Xdnn4kpSuug5JD00z97%25FF3cykxxc77DBBhmfdTTkRnzWWHSrvGGKuALJJMgP9llvdlkEELd6uVVbrVyXXYQnSttOG3s55P41y99decmZZsljYiiIvj4ffQorP22UFu6nn41pNuugmnI00zHCBFF3FWSxxcfVZBBh2OkTTk2hWWWHYxDGGKCCFJJMJP1llvFa8EELAMTVVbNofXXYyT9ttOiov55PLGt99dlFTZZsn5UiiIV%25nffQXmr22UFtNnn4nvNuugmLP00zZghFF3hiSxxcm3PBBh26jTTk2kWWWHuxDGGKJuMJJMXPbllvlSkEEL4MjVVbSVPXXY1prttO8Dp55PYGh99d0fQZZsMtIiiIuuQffQX9M22UFhdnn4nGFuugaxq00z3ZAFF3wRSxxcj7eBBhJPKTTk2BSWWHuHvGGKGHLJJMCFzllvr4jEELsJgVVbctrXXYqemttOods55P44l99dlDGZZsME1iiIJnRffQf4b22UbtAnn4vnquugR3q00zpYhFF3KW4xxcJipBBhy3oTTklh%25&width=420",
			id: 1,
			cost: 13.490
        }, {
			name: "Advance",
			description: "Some description",
			imgUrl: "qweq",
			id: 2,
			cost: 13.490
        }, {
			name: "Sport",
			description: "Some description",
			imgUrl: "qweqwe",
			id: 3,
			cost: 13.490
        }]

		ctrl.selectModel = function(model) {
			ctrl.parent.car = angular.copy(angular.extend(ctrl.parent.car, { model }));
            console.log(ctrl.parent.car);
		}

		ctrl.$onInit = function() {
			ctrl.family = ctrl.parent.car.family.name
		};

		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
