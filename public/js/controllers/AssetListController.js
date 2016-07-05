'use strict';
app.controller('AssetListController', [
    '$scope',
    '$rootScope',
    '$http',
    '$compile',
    'AssetService',
    'UtilService',
    '$timeout',
    '$element',
    function ($scope, $rootScope, $http, $compile, AssetService, UtilService, $timeout, $element) {
        var vm = this;

        //Calendar presettings
        var calendars = ['year_renovated', 'year_built', 'closing_date', 'lease_signed', 'start_date', 'spike_start_date', 
            'spike_end_date', 'comps_date', 'lease_commence', 'period_start', 'sale_date'];
        vm.propertyTypes = [{name: 'Prop1', id: 1}, {name: 'Prop2', id: 2}]

        vm.initCalendarRefs  = function (calendars) {
            for (var k = 0; k < calendars.length; k++) {
                vm[calendars[k]] = {};
                vm[calendars[k]]['opened'] = false;
            }
        }(calendars);

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.disabled = function (date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };
        vm.open = function (ref) {
            vm[ref].opened = true;
        };
        //End calendar presettings

        AssetService.getAssetListData()
          .then(function(response) {
              vm.assets = response;
          })
          .catch (function() {
            console.log('Error to read data');
        });

        vm.showHideDetail = function (ev, collection, curRecord, recType) {
            ev.stopPropagation();
            _.map(collection, function (rec, ind) {
                if (rec !== curRecord && rec.showDetail) {
                    //Check if root element
                    if (vm.assets[ind] === rec) {
                        delete rec.showDetail;
                    }
                }
                return rec;
            });

            if (!curRecord.showDetail) {
                vm.collapseAllDetail(curRecord);
                curRecord.showDetail = true;

                if (recType === 'asset') {
                    vm.repositionAsset(ev, curRecord, false);
                    collection.activeRecord = curRecord;
                    $rootScope.activeCategories = curRecord.details;
                }
            } else {
                if (recType === 'asset') {
                    vm.repositionAsset(ev, curRecord, true);
                }
                delete curRecord.showDetail;
                collection.activeRecord = collection[0];
            }
        }

        vm.repositionAsset = function (ev, curRecord, showPrevAssets) {
            var firstRec;
            angular.forEach(vm.assets, function (rec, ind) {
                if (rec.index < curRecord.index) {
                    rec.visible = showPrevAssets;
                }
                if (!firstRec && rec.visible) {
                    firstRec = rec;
                }
            });
        }

        vm.collapseAllDetail = function (curRecord) {
            if (curRecord.details) {
                delete curRecord.showDetail;
                angular.forEach(curRecord.details, function (rec) {
                    vm.collapseAllDetail(rec);
                });
            } else {
                delete curRecord.showButtons;
                delete curRecord.showInputFields;
                delete curRecord.mode;
            }
        }

        vm.showButtons = function (ev, detail) {
            ev.stopPropagation();
            var buttonsOrDetail = ev.target.closest('.button-items') //edit/delete button
                || ev.target.closest('form.input-fields-form') //input fields
                || ev.target.closest('.uib-datepicker-popup'); //calendar popup
            if (buttonsOrDetail) {
                return;
            }

            detail.showButtons = !detail.showButtons;
            if (detail.showInputFields) {
                vm.showHideInputFields(ev, detail);
            }
        }

        vm.showHideInputFields = function (ev, category, detail, mode) {
            ev.stopPropagation();
            detail.showInputFields = !detail.showInputFields;
            detail.mode = mode;
        }

        vm.addDetail = function (ev, category) {
            ev.stopPropagation();
            var detail = {
                showInputFields: true,
                mode: 'add'
            };
            category['addDetailOpened'] = true;
            category.details.push(detail);
        }

        vm.cancelInputFields = function (ev, detail, category) {
            ev.stopPropagation();

            if (detail.mode === 'add') {
                category.details.pop();
                delete detail;
                delete category.addDetailOpened;
            } else {
                delete detail.mode;
                delete detail.showInputFields;
            }
        }

        vm.deleteCategory = function (ev, category, index) {
            ev.stopPropagation();
            delete category.details.splice(index, 1);
        }

        vm.getTplFile = function (catType, subFolder) {
            var cat = catType.charAt(0).toUpperCase() + catType.slice(1),
                tplPath = "templates/assets/" + subFolder + "/" + cat + ".html";

            return tplPath;
        }

        vm.saveInfoDetail = function (ev, detail) {
            var data = {
                investmentName: detail.investmentName,
                ownershipEntityName: detail.ownershipEntityName,
                previousOwnerName: detail.previousOwnerName,
                purchasePrice: detail.purchasePrice,
                closingDate: UtilService.getFormatedDate(detail.closingDate),
                propertyType: detail.propertyType,
                yearBuilt: detail.yearBuilt.getFullYear(),
                yearRenovated: detail.yearRenovated.getFullYear(),
                costOfRenovation: detail.costOfRenovation,
                address: detail.address,
                zipCode: detail.zipCode,
                overviewComment: detail.overviewComment,
                mode: detail.mode //represent either add/edit
            }
        }

        vm.saveMarketDetail = function (ev, detail) {
            var data = {
                projectName: detail.projectName,
                address: detail.address,
                zipCode: detail.zipCode,
                projectType: detail.projectType,
                projectSize: detail.projectSize,
                projectUnits: detail.projectUnits,
                occupancy: detail.occupancy,
                tenantName: detail.tenantName,
                tenantType: detail.tenantType,
                leasedUnits: detail.leasedUnits,
                leaseSigned: detail.leaseSigned,
                rentPSF: detail.rentPSF,
                annualBumps: detail.annualBumps,
                term: detail.term,
                freeRent: detail.freeRent,
                allowancesPsf: detail.allowancesPsf,
                source: detail.source,
                notes: detail.notes,
                mode: detail.mode //represent either add/edit
            }
        }

        vm.saveExpenseDetail = function (ev, detail) {
            var data = {
                category: detail.category,
                subCategory: detail.subCategory,
                startDate: detail.startDate,
                oneTime: detail.oneTime,
                expenseRepeat: detail.expenseRepeat,
                initialAmount: detail.initialAmount,
                fixedVariable: detail.fixedVariable,
                yOyChange: detail.yOyChange,
                spikeStartDate: detail.spikeStartDate,
                spikeEndDate: detail.spikeEndDate,
                spikeAmount: detail.spikeAmount,
                source: detail.source,
                date: detail.date,
                amount: detail.amount,
                mode: detail.mode //represent either add/edit
            }
        }

        vm.saveRevenueDetail = function (ev, detail) {
            var data = {
                tenantName: detail.tenantName,
                tenantType: detail.tenantType,
                leasedUnits: detail.leasedUnits,
                leaseSigned: detail.leaseSigned,
                leaseCommence: detail.leaseCommence,
                allowancesPsf: detail.allowancesPsf,
                notes: detail.notes,
                periodStart: detail.periodStart,
                periodEnd: detail.periodEnd,
                rent: detail.rent,
                rentType: detail.rentType,
                commission: detail.commission,
                assumption: detail.assumption,
                mode: detail.mode //represent either add/edit
            }
        }


        vm.saveSalesDetail = function (ev, detail) {
            var data = {
                projectName: detail.projectName,
                address: detail.address,
                zipCode: detail.zipCode,
                projectType: detail.projectType,
                projectSize: detail.projectSize,
                projectUnits: detail.projectUnits,
                occupancy: detail.occupancy,
                noi: detail.noi,
                seller: detail.seller,
                saleDate: detail.saleDate,
                broker: detail.broker,
                sources: detail.sources,
                notes: detail.notes,
                mode: detail.mode //represent either add/edit
            }
        }

    }]
);