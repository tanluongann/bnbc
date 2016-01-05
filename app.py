from flask import Flask, render_template, request, abort, jsonify, send_from_directory, g
import json
from bson import BSON
from bson import json_util
from bson.objectid import ObjectId
import os
import glob
import sys
import inspect
import importlib
import time

from utils.dbutils import DBUtils
from utils.interfaceutils import ImportUtils

app = Flask(__name__)

# -----------------------------------------------
# Useful hooks
# -----------------------------------------------

@app.before_request
def before_request():
    g.db = DBUtils.get_db()
    g.path = os.path.dirname(os.path.abspath(__file__))

# -----------------------------------------------
# Homepage (Hosts all HTML/JS/CSS)
# -----------------------------------------------

@app.route("/")
def home():
    return render_template('app.html')

# -----------------------------------------------
# Error pages
# -----------------------------------------------

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

# -----------------------------------------------
# InterfaceTypes (Readonly, since it's python files)
# -----------------------------------------------

@app.route('/interface_types', methods=['GET'])
def interface_types_retrieve_all():
    # Getting the data from the FS wrapper
    es = ImportUtils.get_all_interfaces()
    # Adding key values for React
    for e in es:
        e['key'] = e['id']
    # Adding a root object 'list' for security reasons
    return jsonify({"list": es})

# -----------------------------------------------
# InterfaceInstances
# -----------------------------------------------

interface_instance_forbidden_fields = ['_id', 'last_execution']

@app.route('/interface_instances', methods=['GET'])
def interface_instances_retrieve_all():
    # Getting the data from the DB
    et = g.db.interfaces.find()
    # Converting to an iterable list
    es = [e for e in et]
    for e in es:
        # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
        e['_id'] = str(e['_id'])
        e['key'] = e['_id']
    return jsonify({"list": es})

@app.route('/interface_instances', methods=['POST'])
def interface_instances_create():
    en = request.json
    # We reate a blank object with only the allowed properties
    el = {}
    for prop in request.json:
        if not prop in interface_instance_forbidden_fields:
            el[prop] = request.json[prop]
    # Add the flag
    el['last_execution'] = 0
    el['_id'] = str(g.db.interfaces.insert(el))
    el['key'] = el['_id']
    return jsonify(el)

@app.route('/interface_instances/<string:id>', methods=['GET'])
def interface_instances_retrieve_one(id):
    # Getting the element from the DB
    er = g.db.interfaces.find_one({"_id": ObjectId(id)})
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    if not er:
        abort(404)
    er['_id'] = str(er['_id'])
    return jsonify(er)

@app.route('/interface_instances/<string:id>', methods=['PUT'])
def interface_instances_update(id):
    # Getting the element from the DB
    er = g.db.interfaces.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)
    # Updating the properties
    for prop in request.json:
        if not prop in interface_instance_forbidden_fields:
            er[prop] = request.json[prop]
    g.db.interfaces.replace_one({"_id": ObjectId(id)}, er)
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    er['_id'] = str(er['_id'])
    return jsonify(er)

@app.route('/interface_instances/<string:id>', methods=['DELETE'])
def interface_instances_delete(id):
    er = g.db.interfaces.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)            # Getting the element from the DB
    g.db.interfaces.delete_one({"_id": ObjectId(id)})
    return jsonify({})

# -----------------------------------------------
# ScenarioTypes
# -----------------------------------------------

scenario_type_allowed_fields = ['name', 'author', 'description', 'execution_function', 'trigger_function', 'requirements', 'installation', 'version',]

@app.route('/scenario_types', methods=['GET'])
def scenario_types_retrieve_all():
    # Getting the data from the DB
    et = g.db.scenario_types.find()
    # Converting to an iterable list
    es = [e for e in et]
    for e in es:
        # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
        e['_id'] = str(e['_id'])
        e['key'] = e['_id']
    return jsonify({"list": es})

@app.route('/scenario_types', methods=['POST'])
def scenario_types_create():
    en = request.json
    # We reate a blank object with only the allowed properties
    el = {}
    for prop in request.json:
        if prop in scenario_type_allowed_fields:
            el[prop] = request.json[prop]
    # Add the flag
    el['errors'] = []
    g.db.scenario_types.insert(el)
    el['_id'] = str(el['_id'])
    el['key'] = el['_id']
    return jsonify(el)

@app.route('/scenario_types/<string:id>', methods=['GET'])
def scenario_types_retrieve_one(id):
    # Getting the element from the DB
    er = g.db.scenario_types.find_one({"_id": ObjectId(id)})
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    if not er:
        abort(404)
    er['_id'] = str(er['_id'])
    er['key'] = er['_id']
    return jsonify(er)

@app.route('/scenario_types/<string:id>', methods=['PUT'])
def scenario_types_update(id):
    # Getting the element from the DB
    er = g.db.scenario_types.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)
    # Updating the properties
    for prop in request.json:
        if prop in scenario_type_allowed_fields:
            er[prop] = request.json[prop]
    g.db.scenario_types.replace_one({"_id": ObjectId(id)}, er)
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    er['_id'] = str(er['_id'])
    er['key'] = er['_id']
    return jsonify(er)

@app.route('/scenario_types/<string:id>', methods=['DELETE'])
def scenario_types_delete(id):
    er = g.db.scenario_types.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)
    # Getting the element from the DB
    g.db.scenario_types.delete_one({"_id": ObjectId(id)})
    return jsonify({})

# -----------------------------------------------
# ScenarioInstances
# -----------------------------------------------

scenario_instance_allowed_fields = ['description', 'enabled', 'mapping', 'type',]

@app.route('/scenario_instances', methods=['GET'])
def scenario_instances_retrieve_all():
    # Getting the data from the DB
    et = g.db.scenario_instances.find()
    # Converting to an iterable list
    es = [e for e in et]
    for e in es:
        # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
        e['_id'] = str(e['_id'])
    return jsonify({"list": es})

@app.route('/scenario_instances', methods=['POST'])
def scenario_instances_create():
    en = request.json
    # We reate a blank object with only the allowed properties
    el = {}
    for prop in request.json:
        if prop in scenario_instance_allowed_fields:
            el[prop] = request.json[prop]
    # Add the flag
    el["locked"] = False
    el["errors"] = []
    print "SAVING THE NEW INSTANCE"
    el['_id'] = str(g.db.scenario_instances.insert(el))
    el['key'] = el['_id']
    return jsonify(el)

@app.route('/scenario_instances/<string:id>', methods=['GET'])
def scenario_instances_retrieve_one(id):
    # Getting the element from the DB
    er = g.db.scenario_instances.find_one({"_id": ObjectId(id)})
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    if not er:
        abort(404)
    er['_id'] = str(er['_id'])
    return jsonify(er)

@app.route('/scenario_instances/<string:id>', methods=['PUT'])
def scenario_instances_update(id):
    # Getting the element from the DB
    er = g.db.scenario_instances.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)
    # Updating the properties
    for prop in request.json:
        if prop in scenario_instance_allowed_fields:
            er[prop] = request.json[prop]
    g.db.scenario_instances.replace_one({"_id": ObjectId(id)}, er)
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    er['_id'] = str(er['_id'])
    return jsonify(er)

@app.route('/scenario_instances/<string:id>', methods=['DELETE'])
def scenario_instances_delete(id):
    er = g.db.scenario_instances.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)
    # Getting the element from the DB
    g.db.scenario_instances.delete_one({"_id": ObjectId(id)})
    return jsonify({})

# -----------------------------------------------
# ScenarioInstances
# -----------------------------------------------

@app.route('/device_instances', methods=['GET'])
def device_instances_retrieve_all():
    # Getting the data from the DB
    et = g.db.devices.find()
    # Converting to an iterable list
    es = [e for e in et]
    for e in es:
        # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
        e['_id'] = str(e['_id'])
        e['interface'] = str(e['interface'])
    return jsonify({"list": es})

@app.route('/device_instances/<string:id>', methods=['GET'])
def device_instances_retrieve_one(id):
    # Getting the element from the DB
    er = g.db.devices.find_one({"_id": ObjectId(id)})
    # Changing the _id attribute to plain string (mongodb ObjectId is not well handled in JSON)
    if not er:
        abort(404)
    er['_id'] = str(er['_id'])
    er['interface'] = str(er['interface'])
    return jsonify(er)

@app.route('/device_instances/<string:id>', methods=['PUT'])
def device_instances_update(id):
    # Getting the element from the DB
    er = g.db.devices.find_one({"_id": ObjectId(id)})
    if not er:
        abort(404)
    # Updating the properties
    for prop in request.json:
        # Some properties are defined by the interface responsible for the device, cannot be edited that way
        if prop not in ['_id', 'device_type', 'interface', 'key', 'properties', 'updated']:
            er[prop] = request.json[prop]
    g.db.devices.replace_one({"_id": ObjectId(id)}, er)
    # Changing the _id attributes to plain string (mongodb ObjectId is not well handled in JSON)
    er['_id'] = str(er['_id'])
    er['interface'] = str(er['interface'])
    return jsonify(er)

# -----------------------------------------------
# Execution
# -----------------------------------------------


# @app.route("/active_interfaces")
# @app.route("/active_interfaces/all")
# def active_interfaces_all():
#     db = DBUtils.get_db()
#     intls_py = g.db.interfaces.find()
#     intls = [intl for intl in intls_py]
#     for intl in intls:
#         print intl
#         intl['id'] = str(intl['_id'])
#         try:
#             intl['last_execution'] = time.mktime(intl['last_execution'].timetuple())
#         except:
#             pass
#     return json.dumps({ "active_interfaces": intls}, default=json_util.default)

# @app.route('/active_interfaces/update/<string:active_interfaces_id>', methods = ['POST'])
# def active_interfaces_update(active_interfaces_id):
#     db = DBUtils.get_db()
#     newintf = request.json

#     intf = {}
#     for k in newintf:
#         if k != '_id':
#             intf[k] = newintf[k]

#     print intf

#     if active_interfaces_id == '-1':
#         sid = g.db.interfaces.insert(intf)
#         intf['id'] = str(sid)
#     else:
#         g.db.interfaces.update({"_id": ObjectId(active_interfaces_id)}, intf, upsert=True)
#     return json.dumps({ "active_interface": intf }, default=json_util.default)

# @app.route('/active_interfaces/delete/<string:active_interfaces_id>', methods = ['GET'])
# def active_interfaces_delete(active_interfaces_id):
#     db = DBUtils.get_db()
#     g.db.interfaces.remove({"_id": ObjectId(active_interfaces_id)})
#     return json.dumps({ "status": "ok" }, default=json_util.default)



# @app.route("/api/<object_type>/get/<string:name>")
# def api_get_element(object_type, name):
#     db = DBUtils.get_db()
#     obj = DBUtils.get_custom_element(db, object_type, name)
#     return json.dumps({
#         "query": "get %s.%s" % (object_type, name),
#         "result": obj
#     }, default=json_util.default)

# @app.route("/api/<object_type>/get/<string:name>/<string:property_name>")
# def api_get_element_property(object_type, name, property_name):
#     db = DBUtils.get_db()
#     pro = DBUtils.get_custom_element_property(db, object_type, name, property_name)
#     return json.dumps({
#         "query": "get %s.%s.%s" % (object_type, name, property_name),
#         "result": pro
#     }, default=json_util.default)

# @app.route("/api/<object_type>/set/<string:name>/<string:property_name>/<new_value>")
# def api_set_element_property(object_type, name, property_name, new_value):
#     db = DBUtils.get_db()
#     obj = DBUtils.set_custom_element_property(db, object_type, name, property_name, new_value)
#     return json.dumps({
#         "query": "set %s.%s.%s = %s" % (object_type, name, property_name, new_value),
#         "result": obj
#     }, default=json_util.default)

# @app.route("/api/<object_type>/del/<string:name>/<string:property_name>")
# def api_del_element_property(object_type, name, property_name):
#     # db = DBUtils.get_db()
#     # res = g.db.interfaces.find()
#     return json.dumps({
#         "query": "del %s.%s.%s" % (object_type, name, property_name),
#         "result": "%s.%s" % (name, property_name)
#     }, default=json_util.default)



# @app.route('/scenarios')
# @app.route('/scenarios/all')
# def scenarios_all():
#     db = DBUtils.get_db()
#     scens_py = g.db.scenario_types.find()
#     # convert py mongo list to python list
#     scens = [scen for scen in scens_py]
#     # add requirements
#     for scen in scens:
#         scen['id'] = str(scen['_id'])
#         reqs = scen['requirements'].keys()
#     return json.dumps({ "scenarios": [scen for scen in scens] }, default=json_util.default)

# @app.route('/scenarios/update/<string:scenario_id>', methods = ['POST'])
# def scenarios_update(scenario_id):
#     db = DBUtils.get_db()
#     newscen = request.json
#     scen = {}
#     scen['name'] = newscen['name']
#     scen['author'] = newscen['author']
#     scen['description'] = newscen['description']
#     scen['debug'] = newscen['debug']
#     scen['execution_function'] = newscen['execution_function']
#     scen['trigger_function'] = newscen['trigger_function']

#     scen['requirements'] = {}
#     for r in newscen['requirements']:
#         print '-------'
#         s = "-".join(r.split('-')[-2:])
#         print s
#         newscen['requirements'][r]['id'] = s
#         print newscen['requirements'][r]
#         print '------'
#         scen['requirements'][s] = newscen['requirements'][r]

#     if scenario_id == '-1':
#         sid = g.db.scenario_types.insert(scen)
#         scen['id'] = sid
#     else:
#         g.db.scenario_types.update({"_id": ObjectId(scenario_id)}, scen, upsert=True)
#     return json.dumps({ "scenario": scen }, default=json_util.default)

# @app.route('/scenarios/delete/<string:scenario_id>', methods = ['GET'])
# def scenarios_delete(scenario_id):
#     db = DBUtils.get_db()
#     g.db.scenario_types.remove({"_id": ObjectId(scenario_id)})
#     return json.dumps({ "status": "ok" }, default=json_util.default)





# @app.route('/scenario_instances')
# @app.route('/scenario_instances/all')
# def scenario_instances_all():
#     db = DBUtils.get_db()
#     scens_py = g.db.scenario_instances.find()
#     # convert py mongo list to python list
#     scens = [scen for scen in scens_py]
#     for scen in scens:
#         scen['id'] = str(scen['_id'])
#         scen['type'] = str(scen['type'])
#     # add requirements
#     # for scen in scens:
#     #     scen['id'] = str(scen['_id'])
#     #     reqs = scen['requirements'].keys()
#     #     for req in reqs:
#     #         if not '-' in scen['requirements']:
#     #             scen['requirements']['%s-%s' % (scen['_id'], req)] = scen['requirements'][req]
#     #             del scen['requirements'][req]
#     return json.dumps({ "scenario_instances": [scen for scen in scens] }, default=json_util.default)

# @app.route('/scenario_instances/update/<string:scenario_instance_id>', methods = ['POST'])
# def scenario_instances_update(scenario_instance_id):
#     db = DBUtils.get_db()
#     newscen = request.json
#     scen = {}
#     scen['locked'] = newscen['locked']
#     scen['enabled'] = newscen['enabled']
#     scen['description'] = newscen['description']
#     scen['type'] = newscen['type']
#     scen['mapping'] = newscen['mapping']

#     print newscen

#     if scenario_instance_id == '-1':
#         sid = g.db.scenario_instances.insert(scen)
#         scen['id'] = sid
#     else:
#         g.db.scenario_instances.update({"_id": ObjectId(scenario_instance_id)}, scen, upsert=True)
#     return json.dumps({ "scenario_instance": scen }, default=json_util.default)

# @app.route('/scenario_instances/<string:id>', methods = ['DELETE'])
# def scenario_instances_delete(id):
#     db = DBUtils.get_db()
#     g.db.scenario_instances.remove({"_id": ObjectId(id)})
#     return json.dumps({ "status": "ok" }, default=json_util.default)

# @app.route('/scenario_instances/<string:id>', methods = ['PUT'])
# def scenario_instances_update(id):
#     db = DBUtils.get_db()
#     e = g.db.scenario_instances.find({"_id": ObjectId(id)})
#     # Todo update the
#     e.save()
#     return json.dumps({ "status": "ok" }, default=json_util.default)







# @app.route('/devices', methods='GET')
# def device_get():
#     db = DBUtils.get_db()
#     devs_py = g.db.devices.find()
#     devs = [dev for dev in devs_py]
#     for dev in devs:

#         if 'altid' in dev['properties']: del dev['properties']['altid']
#         if 'credits' in dev['properties']: del dev['properties']['credits']
#         if 'parent' in dev['properties']: del dev['properties']['parent']
#         if 'subcategory' in dev['properties']: del dev['properties']['subcategory']
#         if 'name' in dev['properties']: del dev['properties']['name']
#         if 'state' in dev['properties']: del dev['properties']['state']
#         if 'id' in dev['properties']: del dev['properties']['id']
#         if 'comment' in dev['properties']: del dev['properties']['comment']
#         if 'room' in dev['properties']: del dev['properties']['room']

#         dev['id'] = str(dev['_id'])
#     #     reqs = dev['properties'].keys()
#     #     for req in reqs:
#     #         dev['properties']['%s' % (req)] = dev['properties'][req]
#     #         del dev['properties'][req]
#     return json.dumps({ "devices": [dev for dev in devs] }, default=json_util.default)





