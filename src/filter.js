function createFilter() {
	return {
		CONST: {
			MONTHLY: 12,
			QUARTERLY: 3
		},
		//variables:
		timeInterval: 0,
		data: [], // data for the factor
		periodicChange: [], // change of the IPH for the factor

		//methods:
		addData: function(_data) {
			this.data = _data;
		},

		setTimeInterval: function(interval) {
			this.timeInterval = interval;
		},

		calculateChange: function() {
			var values = this.data;

			for(var i = 0; i < values.length; i++) {
				if(i === 0) {
					this.periodicChange.push(0);
					continue;
				}
				var difference = calculateDifference(values[i-1], values[i]);
				this.periodicChange.push(difference);
			}
		},

		filterData: function(basis, beginnSerries, endSerries) {
			var calculatedChange = [];
			var change;
			var start = beginnSerries * this.timeInterval || 0;
			var end = endSerries * this.timeInterval || this.periodicChange.length;
			for(var i = start; i <= end; i++) {
				change = basis * this.periodicChange[i]; // periodicChange is in %
				change = (change / 100);
				calculatedChange.push(change);
			}

			var resultData = [];
			var result;
			for(i = 0; i < calculatedChange.length; i++) {
				result = basis + calculatedChange[i];
				resultData.push(result.toFixed(2));
			}

			return resultData;
		},

		convertToMothly: function() {
			if(this.timeInterval < this.CONST.MONTHLY && this.timeInterval !== 0) {
				var newData = [];
				for(var i = 0; i < this.data.length; i++) {
					for(var j = 0; j < this.CONST.MONTHLY; j++) {
						newData.push(this.data[i]);
					}
				}

				this.setTimeInterval(this.CONST.MONTHLY);
				this.data = newData;
			}
		},

		convertToQuarter: function() {
			if(this.timeInterval < this.CONST.QUARTERLY && this.timeInterval !== 0) {
				var newData = [];
				for(var i = 0; i < this.data.length; i++) {
					for(var j = 0; j < this.CONST.QUARTERLY; j++) {
						newData.push(this.data[i]);
					}
				}

				this.setTimeInterval(this.CONST.QUARTERLY);
				this.data = newData;
			}
		},
	};
}
